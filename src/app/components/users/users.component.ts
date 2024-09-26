import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { STATUS_EDIT, STATUS_NEW } from 'src/app/models/constants';
import { UserI } from 'src/app/models/user.model';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['username', 'expirationDate', 'enabled', 'actions'];
    dataSource = new MatTableDataSource<UserI>();
    isLoading = true;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private dialog: MatDialog,
        private userService: UserService,
        private snackbarService: SnackbarService,
        private translate: TranslateService) { }

    async ngOnInit(): Promise<void> {
        await this.getUsers();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    async getUsers(): Promise<void> {
        try {
            const users = await lastValueFrom(this.userService.getUsers());
            this.dataSource.data = users;
            console.info("[INFO] [getUsers] User list retrieved successfully.");
        } catch (error) {
            console.error(`[ERROR] [getUsers] An error occurred while retrieving the users list: ${error}`);
            this.dataSource.data = [];
        } finally {
            this.isLoading = false;
        }
    }

    addUser(): void {
        const dialogRef = this.dialog.open(UserModalComponent, {
            width: '800px',
            disableClose: true,
            data: { status: STATUS_NEW }
        });

        dialogRef.afterClosed().subscribe(async result => {
            if (result) {
                const newUser = await lastValueFrom(this.userService.addUser(result));

                if (newUser) {
                    console.info("[INFO] [addUser] User created successfully.");
                    this.snackbarService.showMessage('users-view.user-added-success');
                    this.getUsers();
                } else {
                    console.error(`[ERROR] [addUser] An error occurred while creating a user.`);
                }
            }
        });
    }

    editUser(user: UserI): void {
        const dialogRef = this.dialog.open(UserModalComponent, {
            width: '800px',
            disableClose: true,
            data: { status: STATUS_EDIT, user: user }
        });

        dialogRef.afterClosed().subscribe(async result => {
            if (result) {
                const updatedUser = await lastValueFrom(this.userService.updateUser(result));

                if (updatedUser) {
                    console.info("[INFO] [editUser] User edited successfully.");
                    this.snackbarService.showMessage('users-view.user-updated-success');
                    this.getUsers();
                } else {
                    console.error(`[ERROR] [editUser] An error occurred while editing a user.`);
                }
            }
        });
    }

    async deleteUser(id: number): Promise<void> {

        const translations = await lastValueFrom(this.translate.get(['delete-user-modal.title',  'delete-user-modal.message', 'delete-user-modal.confirm-btn']));

        const dialogRef = this.dialog.open(AlertModalComponent, {
            width: '400px',
            disableClose: true,
            data: {
                title: translations['delete-user-modal.title'],
                message: translations['delete-user-modal.message'],
                confirmButtonColor: 'warn',
                confirmButtonText: translations['delete-user-modal.confirm-btn']
            }
        });

        dialogRef.afterClosed().subscribe(async result => {
            if (result) {

                const deleteOk = await lastValueFrom(this.userService.deleteUser(id));

                if (deleteOk) {
                    console.info("[INFO] [deleteUser] User deleted successfully.");
                    this.snackbarService.showMessage('users-view.user-deleted-success');
                    this.getUsers();
                    return;
                } else {
                    console.error(`[ERROR] [deleteUser] An error occurred while deleting a user.`);
                }
            }
        });
    }

    applyFilter(event: KeyboardEvent): void {
        const target = event.target as HTMLInputElement;
        this.dataSource.filter = target.value.trim().toLowerCase();
    }
}