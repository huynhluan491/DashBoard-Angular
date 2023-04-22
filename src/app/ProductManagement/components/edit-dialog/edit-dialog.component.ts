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
    });

    selectedItem: any;

    @Input() isShowEditDialog?: boolean;
    @Output() handleToggleEditDialog: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() handlePostEditAPI = new EventEmitter<any>();

    constructor(private formService: ProductManagementService) {}

    ngOnInit(): void {
        this.selectedItem = this.formService._isEditItem;
        if (this.selectedItem) {
            this.editDialogForm?.controls['barcode'].setValue(this.selectedItem?.Barcode);
            this.editDialogForm?.controls['productName'].setValue(this.selectedItem?.ProductName);
        }
    }

    closeDeleteDialog(make: string) {
        if (make === 'yes') {
            const updateInfo = {
                Code: this.selectedItem.Code,
                Barcode: Number(this.editDialogForm.controls['barcode'].value),
                Poscode: Number(this.editDialogForm.controls['poscode'].value),
                ImageLarge: null,
                ImageSmall: null,
                ImageThumb: this.selectedItem.ImageThumb,
                ProductName: this.editDialogForm.controls['productName'].value,
            };
            this.handleToggleEditDialog.emit(false);
            this.handlePostEditAPI.emit(updateInfo);
            window.alert('Updated');
        } else {
            window.alert('Canceled');
            this.handleToggleEditDialog.emit(false);
        }
    }
}
