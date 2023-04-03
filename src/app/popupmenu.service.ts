import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PopupMenuService {
    private isOpen = false;

    constructor() {}

    handleOpenForm(): void {
        this.isOpen = true;
    }

    handleCloseForm(): void {
        this.isOpen = false;
    }

    get isPopupOpen(): boolean {
        return this.isOpen;
    }
}
