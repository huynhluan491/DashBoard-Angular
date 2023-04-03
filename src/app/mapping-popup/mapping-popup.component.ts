import { Component } from '@angular/core';
import { FormService } from '../form-service.service';

@Component({
    selector: 'app-mapping-popup',
    templateUrl: './mapping-popup.component.html',
    styleUrls: ['./mapping-popup.component.scss'],
})
export class MappingPopupComponent {
    constructor(private formService: FormService) {}

    // toggleFormOpen(): void {
    //     this.formService.handleOpenForm();
    // }
}
