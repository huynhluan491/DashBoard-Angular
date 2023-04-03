import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductManagementService } from '../../services/product-management.service';

@Component({
    selector: 'app-add-product-form',
    templateUrl: './add-product-form.component.html',
    styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent {
    public addForm: FormGroup = new FormGroup({
        barcode: new FormControl(),
        productName: new FormControl(),
    });

    constructor(private addFormService: ProductManagementService) {}

    togglecloseForm(): void {
        this.addFormService.handleCloseForm();
    }
}
