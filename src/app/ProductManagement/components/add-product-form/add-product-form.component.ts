import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductManagementService } from '../../services/product-management.service';
import { ProductService } from 'src/app/product.service';
import { Subject, catchError, debounceTime, map, of, switchMap, take, takeUntil } from 'rxjs';

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
    private unsubscribe$ = new Subject<void>();

    constructor(private addFormService: ProductManagementService, private serviceOfProduct: ProductService) {}

    ngOnInit(): void {
        this.addForm = new FormGroup({
            code: new FormControl(),
            barcode: new FormControl(''),
            productName: new FormControl({ value: '', disabled: true }),
            isNew: new FormControl({ value: false, disabled: true }),
            isHachi24h: new FormControl({ value: false, disabled: true }),
            isBestPrice: new FormControl({ value: false, disabled: true }),
            isSpecial: new FormControl({ value: false, disabled: true }),
            isGift: new FormControl({ value: false, disabled: true }),
            isPromotion: new FormControl({ value: false, disabled: true }),
            isCombo: new FormControl({ value: false, disabled: true }),
            Price: new FormControl(),
            PriceBase: new FormControl(),
            PriceVIP: new FormControl({ value: null, disabled: true }),
            Discount: new FormControl({ value: null, disabled: true }),
            OrginalName: new FormControl({ value: null, disabled: true }),
        });
        this.isEditForm = this.addFormService.isEditForm;
        if (this.isEditForm) {
            this.selectedItem = this.addFormService._isEditItem;
        }

        if (this.isEditForm == true) {
            this.addForm.controls['barcode']?.disable();
            this.handleSetValueForm();
        }
    }

    handleSetValueForm() {
        this.addForm?.controls['code'].setValue(this.selectedItem?.Code);
        this.addForm?.controls['barcode'].setValue(this.selectedItem?.Barcode);
        this.addForm?.controls['productName'].setValue(this.selectedItem?.ProductName);
        this.addForm?.controls['isNew'].setValue(this.selectedItem?.IsNew);
        this.addForm?.controls['isHachi24h'].setValue(this.selectedItem?.IsHachi24h);
        this.addForm?.controls['isBestPrice'].setValue(this.selectedItem?.IsBestPrice);
        this.addForm?.controls['isSpecial'].setValue(this.selectedItem?.IsSpecial);
        this.addForm?.controls['isGift'].setValue(this.selectedItem?.IsGift);
        this.addForm?.controls['isPromotion'].setValue(this.selectedItem?.IsPromotion);
        this.addForm?.controls['isCombo'].setValue(this.selectedItem?.IsCombo);
        this.addForm?.controls['Price'].setValue(this.selectedItem?.Price);
        this.addForm?.controls['PriceBase'].setValue(this.selectedItem?.PriceBase);
        this.addForm?.controls['PriceVIP'].setValue(this.selectedItem?.PriceVIP);
        this.addForm?.controls['Discount'].setValue(this.selectedItem?.Discount);
        this.addForm?.controls['OrginalName'].setValue(this.selectedItem?.OrginalName);
    }

    togglecloseForm(): void {
        this.addFormService.handleCloseForm();
        this.selectedItem = null;
        this.drawerView.toggle();
    }

    handleEditProduct() {
        if (this.isEditForm) {
            const updateValue = {
                Code: this.selectedItem.Code,
                Barcode: this.selectedItem.Barcode,
                Price: this.addForm.controls['Price'].value,
                PriceBase: this.addForm.controls['PriceBase'].value,
            };
            // Call api sequentially
            this.serviceOfProduct
                .updateProductByCode(updateValue)
                .pipe(
                    switchMap((resultFromUpdate) =>
                        this.serviceOfProduct.getProductByCode(this.selectedItem.Code).pipe(
                            catchError((err) => {
                                console.log('Error for second API', err);
                                return of();
                            }),
                        ),
                    ),
                )
                .subscribe((res) => (this.selectedItem = res));
            window.alert('EDIT SUCCESSFULLY');
        } else {
            this.selectedItem.Price = this.addForm.controls['Price'].value;
            this.selectedItem.PriceBase = this.addForm.controls['PriceBase'].value;
            this.serviceOfProduct.updateProductByCode(this.selectedItem).subscribe((data) => {
                console.log(data);
            });
            this.serviceOfProduct.handleTriggerGetList();
            window.alert('ADD Successfully');
        }
    }

    handleGetProductByBarcode() {
        const barcode = this.addForm.controls['barcode'].value;
        if (barcode.length > 0) {
            this.serviceOfProduct.getProductByBarcode(barcode).subscribe((data) => {
                if (data.ErrorString !== null) {
                    window.alert(data.ErrorString);
                    this.addForm.controls['barcode'].setValue('');
                } else {
                    this.selectedItem = data.ObjectReturn;
                    this.handleSetValueForm();
                }
            });
        } else {
            this.addForm.reset();
        }
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
