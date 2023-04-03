import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ProductManagementService {
    isFormOpen = false;
    constructor() {}

    get _isFormOpen() {
        return this.isFormOpen;
    }

    handleOpenForm(): void {
        this.isFormOpen = true;
    }

    handleCloseForm(): void {
        this.isFormOpen = false;
    }
}
