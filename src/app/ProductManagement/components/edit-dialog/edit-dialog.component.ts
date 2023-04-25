import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { ProductManagementService } from '../../services/product-management.service';

@Component({
    selector: 'app-edit-dialog',
    templateUrl: './edit-dialog.component.html',
    styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
    editDialogForm: FormGroup = new FormGroup({
        barcode: new FormControl(),
        productName: new FormControl(),
        Price: new FormControl(),
        PriceBase: new FormControl(),
    });

    selectedItem: any;

    @Input() isShowEditDialog?: boolean;
    @Output() handleToggleEditDialog: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() handlePostEditAPI = new EventEmitter<any>();

    constructor(private formService: ProductManagementService) {}

    ngOnInit(): void {
        this.selectedItem = this.formService._isEditItem;
        console.log(this.selectedItem);

        if (this.selectedItem) {
            this.editDialogForm?.controls['barcode'].setValue(this.selectedItem?.Barcode);
            this.editDialogForm?.controls['productName'].setValue(this.selectedItem?.ProductName);
            this.editDialogForm?.controls['Price'].setValue(this.selectedItem?.Price);
            this.editDialogForm?.controls['PriceBase'].setValue(this.selectedItem?.PriceBase);
        }
    }

    closeDeleteDialog(make: string) {
        if (make === 'yes') {
            this.selectedItem.Price = this.editDialogForm.controls['Price'].value;
            this.selectedItem.PriceBase = this.editDialogForm.controls['PriceBase'].value;
            this.handleToggleEditDialog.emit(false);
            this.handlePostEditAPI.emit(this.selectedItem);
            window.alert('Updated');
        } else {
            window.alert('Canceled');
            this.handleToggleEditDialog.emit(false);
        }
    }
}
