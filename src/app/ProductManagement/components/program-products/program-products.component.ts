import { Component } from '@angular/core';
import { ProductManagementService } from '../../services/product-management.service';

@Component({
    selector: 'app-program-products',
    templateUrl: './program-products.component.html',
    styleUrls: ['./program-products.component.scss'],
})
export class ProgramProductsComponent {
    constructor(private addFormService: ProductManagementService) {}

    handleOpenForm() {
        this.addFormService.handleCheckTypeOfForm(true, undefined);
        this.addFormService.handleOpenForm();
    }
}
