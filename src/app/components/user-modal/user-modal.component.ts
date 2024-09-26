import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { STATUS_EDIT, STATUS_NEW } from 'src/app/models/constants';
import { UserI } from 'src/app/models/user.model';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
    selector: 'app-user-modal',
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent {
    title: string = '';

    user: UserI & { repeatPassword?: string } = {
        id: 0,
        username: '',
        expirationDate: undefined,
        password: '',
        enabled: false,
        repeatPassword: ''
    };

    userForm: FormGroup;

    constructor(
        private formValidatorSrv: FormValidatorService,
        public dialogRef: MatDialogRef<UserModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { status: string, user: UserI }) {

        if (this.data.status === STATUS_NEW) {
            this.title = 'new-user-title';

        } else if (this.data.status === STATUS_EDIT) {
            this.title = 'edit-user-title';
            this.initializeUser(data.user);
            
        }

        this.userForm = this.createForm();
    }

    private initializeUser(userData: UserI) {
        this.user = {
            id: userData.id ?? 0,
            username: userData.username,
            expirationDate: userData.expirationDate,
            password:userData.password,
            repeatPassword: userData.password,
            enabled: userData.enabled
        }
    }

    private createForm(): FormGroup  {
        return new FormGroup({
            username: new FormControl(this.user.username, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
            password: new FormControl(this.user.password, [Validators.required, Validators.minLength(6)]),
            repeatPassword: new FormControl(this.user.repeatPassword, [Validators.required, Validators.minLength(6)]),
            expirationDate: new FormControl(this.user.expirationDate),
            enabled: new FormControl(this.user.enabled)
        }, { validators: [this.formValidatorSrv.passwordMatchValidator] });
    }

    checkFieldsOk(): boolean {
        return this.userForm.valid;
    }

    onCancel(): void {
        this.dialogRef.close(null);
    }

    onSave(): void {

        //Extra check if disabled fails
        if(this.userForm.invalid) {
            return;
        }

        const formValues = this.userForm.value;

        const updatedUser: UserI = {
            id: this.user.id,
            username: formValues.username,
            password: formValues.password,
            expirationDate: formValues.expirationDate,
            enabled: formValues.enabled
        };

        this.dialogRef.close(updatedUser);
    }
}
