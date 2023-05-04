import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LocationFormService {
    public isOpenForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public typeOfForm: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor() {}

    _isOpenForm() {
        return this.isOpenForm.asObservable();
    }

    openLocationForm() {
        this.isOpenForm.next(true);
    }

    get _typeOfForm(): string {
        return this._typeOfForm;
    }

    setTypeOfForm(type: string) {
        this.typeOfForm.next(type);
        console.log(this.typeOfForm);
    }

    closeLocationForm() {
        this.isOpenForm.next(false);
    }
}
