import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEmitter } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LangChangeEvent, TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;
    let userServiceMock: any;
    let dialogMock: any;
    let snackBarMock: any;

    beforeEach(async () => {
        userServiceMock = {
            getUsers: jasmine.createSpy('getUsers').and.returnValue(of([])),
            addUser: jasmine.createSpy('addUser').and.returnValue(of({})),
            updateUser: jasmine.createSpy('updateUser').and.returnValue(of({})),
            deleteUser: jasmine.createSpy('deleteUser').and.returnValue(of(true))
        };

        dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
        dialogMock.open.and.returnValue({
            afterClosed: () => of()
        });

        snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

        const translateService = jasmine.createSpyObj<TranslateService>('translateService', ['instant', 'get']);

        const translateServiceMock = {
            currentLang: 'en',
            onLangChange: new EventEmitter<LangChangeEvent>(),
            use: translateService.get,
            get: translateService.get.and.returnValue(of('')),
            onTranslationChange: new EventEmitter(),
            onDefaultLangChange: new EventEmitter()
        };

        await TestBed.configureTestingModule({
            declarations: [UsersComponent, TranslatePipe],
            providers: [
                { provide: UserService, useValue: userServiceMock },
                { provide: MatDialog, useValue: dialogMock },
                { provide: MatSnackBar, useValue: snackBarMock },
                { provide: TranslateService, useValue: translateServiceMock }
            ],
            imports: [
                BrowserAnimationsModule,
                MatDialogModule,
                MatSnackBarModule,
                MatTableModule,
                MatPaginatorModule,
                MatSortModule,
                MatProgressSpinnerModule,
                MatFormFieldModule,
                MatInputModule,
                MatTooltipModule,
                MatIconModule,
                TranslateModule.forRoot({})
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    

    it('should call getUsers on ngOnInit', async () => {
        spyOn(component, 'getUsers');
        await component.ngOnInit();
        expect(component.getUsers).toHaveBeenCalled();
    });


    it('should set dataSource.data after getUsers', async () => {
        const mockUsers = [{ id: 1, username: 'Admin', expirationDate: new Date(), password: '1234', enabled: true }];

        userServiceMock.getUsers.and.returnValue(of(mockUsers));
        await component.getUsers();

        expect(component.dataSource.data).toEqual(mockUsers);
        expect(component.isLoading).toBeFalse();
    });


    it('should add user after addUser', async () => {
        const newUser = { id: 1, username: 'NewUser', expirationDate: new Date(), password: '', enabled: true };
        userServiceMock.addUser.and.returnValue(of(newUser));
        userServiceMock.getUsers.and.returnValue(of([newUser]));
    
        const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
        dialogRefSpy.afterClosed.and.returnValue(of(newUser));
        dialogMock.open.and.returnValue(dialogRefSpy);
    
        await component.addUser();
    
        expect(dialogMock.open).toHaveBeenCalled();
        expect(userServiceMock.getUsers).toHaveBeenCalled();
    
        await fixture.whenStable();
    
        const newUserInDataSource = component.dataSource.data.find(user => user.id === newUser.id);
    
        expect(newUserInDataSource).toBeDefined();
    
        if (newUserInDataSource) {
            expect(newUserInDataSource.id).toEqual(newUser.id);
            expect(newUserInDataSource.username).toEqual(newUser.username);
            expect(newUserInDataSource.password).toEqual(newUser.password);
            expect(newUserInDataSource.enabled).toEqual(newUser.enabled);
            expect(newUserInDataSource.expirationDate?.getTime()).toEqual(newUser.expirationDate.getTime());
        }
    });
    

    it('should apply filter to dataSource', () => {
        const event = { target: { value: 'user' } } as unknown as KeyboardEvent;
        component.applyFilter(event);
        expect(component.dataSource.filter).toBe('user');
    });
});