import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductManagementService } from '../../services/product-management.service';

@Component({
    selector: 'app-add-product-form',
    templateUrl: './add-product-form.component.html',
    styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent implements OnInit {
    // public addForm: FormGroup = new FormGroup({
    //     barcode: new FormControl(),
    //     postcode: new FormControl(),
    //     productName: new FormControl(),
    // });
    addForm!: FormGroup;
    selectedItem: any;
    isEditForm: boolean = false;

    constructor(private addFormService: ProductManagementService) {}

    ngOnInit(): void {
        this.addForm = new FormGroup({
            barcode: new FormControl(),
            poscode: new FormControl(),
            productName: new FormControl(),
        });
        this.selectedItem = this.addFormService._isEditItem;
        this.isEditForm = this.addFormService.isEditForm;
        console.log(this.selectedItem);

        if (this.isEditForm == false) {
            this.addForm?.controls['barcode'].setValue(this.selectedItem?.Barcode);
            this.addForm?.controls['poscode'].setValue(this.selectedItem?.Poscode);
            this.addForm?.controls['productName'].setValue(this.selectedItem?.ProductName);
        } else {
            this.addForm?.controls['barcode'].setValue(null);
            this.addForm?.controls['poscode'].setValue(null);
            this.addForm?.controls['productName'].setValue(null);
        }
    }

    togglecloseForm(): void {
        this.addFormService.handleCloseForm();
    }
}
