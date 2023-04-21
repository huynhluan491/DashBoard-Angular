import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ProductManagementService {
    myDrawerView: any;
    isFormOpen = false;
    isNewProduct: boolean = false;
    isEditItem: any;
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

    handleCheckTypeOfForm(value: boolean, item: any) {
        this.isNewProduct = value;
        if (!this.isNewProduct) {
            this.isEditItem = item;
        }
        console.log(this.isEditItem);
    }

    get isOpenForm(): boolean {
        return this.isFormOpen;
    }

    get _isEditItem(): any {
        return this.isEditItem;
    }

    get isEditForm(): boolean {
        return this.isNewProduct;
    }
}
