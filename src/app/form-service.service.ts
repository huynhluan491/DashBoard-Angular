import { Injectable } from '@angular/core';
import { Link } from './link';

@Injectable({
    providedIn: 'root',
})
export class FormService {
    private isOpen = false;
    private isNew = false;
    private editItem!: Link;
    constructor() {}

    handleOpenForm(): void {
        this.isOpen = true;
    }

    handleCloseForm(): void {
        this.isOpen = false;
    }

    handleCheckisNew(value: boolean, editedItem: any): void {
        this.isNew = value;
        console.log(this.isNew);
        if (this.isNew == false) {
            this.editItem = editedItem;
        }
    }

    get isOpenForm(): boolean {
        return this.isOpen;
    }

    get isEditItem(): Link {
        return this.editItem;
    }

    get isEditForm(): boolean {
        return this.isNew;
    }
}
