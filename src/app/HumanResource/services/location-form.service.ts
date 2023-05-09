import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LocationFormService {
    public isOpenForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public typeOfForm: string = '';
    selectedItem: any;
    underInfo?: any;

    constructor() {}

    _isOpenForm() {
        return this.isOpenForm.asObservable();
    }

    openLocationForm() {
        this.isOpenForm.next(true);
    }

    get _typeOfForm(): string {
        return this.typeOfForm;
    }

    get _selectedItem() {
        return this.selectedItem;
    }

    setTypeOfForm(type: string, selectedItem?: any) {
        if (selectedItem) {
            this.selectedItem = { ...selectedItem };
        }
        this.typeOfForm = type;
        console.log(this.typeOfForm);
    }

    get _UnderParentName() {
        return this.underInfo;
    }

    setUnderParentName(name: string) {
        this.underInfo = name;
    }

    closeLocationForm() {
        this.isOpenForm.next(false);
    }
}
