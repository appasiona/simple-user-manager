import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private translate: TranslateService,
    private snackBar: MatSnackBar,) { }

  showMessage(msgTranslateKey: string): void {
    this.translate.get([msgTranslateKey, 'generic.close']).subscribe(translations => {
        this.snackBar.open(translations[msgTranslateKey], translations['generic.close'], {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
        });
    });
  }
}
