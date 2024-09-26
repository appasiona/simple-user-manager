import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {

    constructor(
        public dialogRef: MatDialogRef<AlertModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { 
            title: string, 
            message: string, 
            confirmButtonColor: string, 
            confirmButtonText: string
          }
    ) { }

    onConfirm(): void {
        this.dialogRef.close(true); 
    }

    onCancel(): void {
        this.dialogRef.close(false); 
    }

}
