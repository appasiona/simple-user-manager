import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class CustomPaginatorIntlService extends MatPaginatorIntl {

    constructor(private translate: TranslateService) {
        super();
        this.translate.onLangChange.subscribe(() => this.translateLabels());
    }

    private translateLabels() {
        this.translate.get([
            'users-view.users-per-page',
            'users-view.next-page',
            'users-view.prev-page',
            'users-view.first-page',
            'users-view.last-page'
        ]).subscribe(translations => {
            this.itemsPerPageLabel = translations['users-view.users-per-page'];
            this.nextPageLabel = translations['users-view.next-page'];
            this.previousPageLabel = translations['users-view.prev-page'];
            this.firstPageLabel = translations['users-view.first-page'];
            this.lastPageLabel = translations['users-view.last-page'];
            this.changes.next();
        });

    }
}
