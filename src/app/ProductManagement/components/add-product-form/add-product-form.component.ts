import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductManagementService } from '../../services/product-management.service';

@Component({
    selector: 'app-add-product-form',
    templateUrl: './add-product-form.component.html',
    styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent implements OnInit {
    addForm!: FormGroup;
    selectedItem: any;
    isEditForm: boolean = false;

    @Input() drawerView: any;
    @Output() handlePostEditAPI = new EventEmitter<any>();
    @Output() handlePostAddAPI = new EventEmitter<any>();

    constructor(private addFormService: ProductManagementService) {}

    ngOnInit(): void {
        this.addForm = new FormGroup({
            barcode: new FormControl(),
            productName: new FormControl(),
            FreeShippingImage: new FormControl(),
            isNew: new FormControl(false),
            isHachi24h: new FormControl(false),
            isBestPrice: new FormControl(false),
            isSpecial: new FormControl(false),
            isGift: new FormControl(false),
            isPromotion: new FormControl(false),
            isCombo: new FormControl(false),
            Price: new FormControl(),
        });
        this.selectedItem = this.addFormService._isEditItem;
        this.isEditForm = this.addFormService.isEditForm;
        console.log(this.selectedItem);

        if (this.isEditForm == false) {
            this.addForm?.controls['barcode'].setValue(this.selectedItem?.Barcode);
            this.addForm?.controls['productName'].setValue(this.selectedItem?.ProductName);
            this.addForm?.controls['FreeShippingImage'].setValue(this.selectedItem?.FreeShippingImage);
            this.addForm?.controls['isNew'].setValue(this.selectedItem?.IsNew);
            this.addForm?.controls['isHachi24h'].setValue(this.selectedItem?.IsHachi24h);
            this.addForm?.controls['isBestPrice'].setValue(this.selectedItem?.IsBestPrice);
            this.addForm?.controls['isSpecial'].setValue(this.selectedItem?.IsSpecial);
            this.addForm?.controls['isGift'].setValue(this.selectedItem?.IsGift);
            this.addForm?.controls['isPromotion'].setValue(this.selectedItem?.IsPromotion);
            this.addForm?.controls['isCombo'].setValue(this.selectedItem?.IsCombo);
            this.addForm?.controls['Price'].setValue(this.selectedItem?.Price);
        } else {
            this.addForm?.controls['barcode'].setValue(null);
            this.addForm?.controls['productName'].setValue(null);
            this.addForm?.controls['FreeShippingImage'].setValue('');
            this.addForm?.controls['isNew'].setValue(false);
            this.addForm?.controls['isHachi24h'].setValue(false);
            this.addForm?.controls['isBestPrice'].setValue(false);
            this.addForm?.controls['isSpecial'].setValue(false);
            this.addForm?.controls['isGift'].setValue(false);
            this.addForm?.controls['isPromotion'].setValue(false);
            this.addForm?.controls['isCombo'].setValue(false);
            this.addForm?.controls['Price'].setValue(null);
        }
    }

    togglecloseForm(): void {
        this.addFormService.handleCloseForm();
        this.drawerView.toggle();
    }

    handleEditProduct() {
        if (this.isEditForm) {
            const newProduct = {
                Code: Math.random() * (10000 - 100) + 100,
                Barcode: this.addForm.controls['barcode'].value,
                Poscode: this.addForm.controls['poscode'].value,
                ImageLarge: null,
                ImageSmall: null,
                ImageThumb: '/Uploads/_11/product1/4987332343028.jpg',
                ProductName: this.addForm.controls['productName'].value,
            };
            this.handlePostAddAPI.emit(newProduct);
            window.alert('ADD SUCCESSFULLY');
        } else {
            const updateInfo = {
                Code: this.selectedItem.Code,
                Barcode: Number(this.addForm.controls['barcode'].value),
                Poscode: Number(this.addForm.controls['poscode'].value),
                ImageLarge: null,
                ImageSmall: null,
                ImageThumb: this.selectedItem.ImageThumb,
                ProductName: this.addForm.controls['productName'].value,
            };
            this.handlePostEditAPI.emit(updateInfo);
            window.alert('Update Successfully');
        }
    }
}
