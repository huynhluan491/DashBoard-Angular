import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { PageChangeEvent } from '@progress/kendo-angular-pager';
import { ProductService } from 'src/app/product.service';
import { Product, productList } from 'src/services/product';
import { State } from '@progress/kendo-data-query';
import { Observable, Subject, switchMap } from 'rxjs';
import * as $ from 'jquery';
import { ProductManagementService } from '../../services/product-management.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
    public gridView!: GridDataResult;
    public view: Observable<any> | undefined;
    public products: Product[] = productList;
    public productPage: Product[] = [];
    public sizes = [20, 50];
    public buttonCount = 10;
    public page = 1;

    listProduct: any[] = [];
    totalProducts = 0;
    selectedEditItem: any;
    isDeleteDialogOpened: boolean = false;
    selectedDeleteItem: any;
    isShowEditDialog: boolean = false;

    @Input() drawerView: any;

    public state: State = {
        skip: 0,
        take: 10,
        filter: {
            filters: [
                {
                    field: 'Barcode',
                    operator: 'contains',
                    value: '',
                },
                {
                    field: 'Poscode',
                    operator: 'contains',
                    value: '',
                },
                {
                    field: 'ProductName',
                    operator: 'contains',
                    value: '',
                },
            ],
            logic: 'or',
        },
        sort: [{ field: 'Code', dir: 'desc' }],
    };

    // Box filter for 3 fields searched
    private filters: { [key: string]: any } = {
        Barcode: this.state.filter?.filters[0],
        Poscode: this.state.filter?.filters[1],
        ProductName: this.state.filter?.filters[2],
    };

    constructor(private serviceOfProduct: ProductService, private addFormService: ProductManagementService) {}

    ngOnInit(): void {
        this.getListProduct();

        // update value for filter value
        this.serviceOfProduct.getSearchValue().subscribe((value) => {
            Object.entries(this.filters).forEach(([key, filter]) => {
                if (filter && filter.field === key) {
                    filter.value = value;
                }
            });
            this.getListProduct();
        });

        this.serviceOfProduct._isListUpdate().subscribe((value) => {
            this.getListProduct();
        });
    }

    ngAfterViewInit(): void {
        $('.paging-wrapper .k-input-button .k-i-caret-alt-down').remove();
    }

    private getListProduct(): void {
        this.serviceOfProduct.getListProduct(this.state).subscribe((data) => {
            this.listProduct = data.Data;
            this.totalProducts = data.Total;
            this.pageData();
        });
    }

    private pageData(): void {
        this.gridView = {
            data: this.listProduct,
            total: this.totalProducts,
        };
    }

    public goToPreviousPage() {
        if (this.state.skip !== 0) {
            this.state.skip! -= this.state.take!;
            this.getListProduct();
        }
    }

    public onPageChange(e: PageChangeEvent): void {
        this.state.skip = e.skip;
        this.page = this.state.skip / e.take + 1;
        this.state.take = e.take;
        this.pageData();
    }

    public goToNextPage() {
        if (this.state.skip! >= this.totalProducts + 1 - this.state.take!) {
            this.state.skip = 0;
            this.getListProduct();
        } else {
            this.state.skip! += this.state.take!;
            this.getListProduct();
        }
    }

    public goToFirstPage() {
        this.state.skip = 0;
        this.page = 1;
        this.getListProduct();
    }

    public goToLastPage(total: any) {
        this.state.skip = this.totalProducts + 1 - this.state.take!; // skip to last page
        this.page = Math.round(this.state.skip / this.state.take! + 1);
        this.getListProduct();
    }

    onDeleteProduct(data: any) {
        console.log(data);

        this.selectedDeleteItem = data;
        this.isDeleteDialogOpened = true;
        console.log(this.selectedDeleteItem);
    }

    closeDeleteDialog(make: string) {
        if (make === 'yes') {
            this.serviceOfProduct.deleteProductByCode(this.selectedDeleteItem.Code).subscribe((value) => {
                console.log(value);
            });
            this.isDeleteDialogOpened = false;
            this.getListProduct();
            window.alert('Deleted');
        } else {
            this.isDeleteDialogOpened = false;
            window.alert('Canceled');
        }
    }

    onEditProduct(code: number) {
        this.serviceOfProduct.getProductByCode(code).subscribe((data) => {
            this.selectedEditItem = data;
            this.addFormService.handleOpenForm();
            this.addFormService.handleCheckTypeOfForm(true, this.selectedEditItem);
            this.drawerView.toggle();
        });
    }

    handlePostEditAPI(updateInfo: any) {
        this.serviceOfProduct
            .updateProductByCode(updateInfo)
            .pipe(switchMap((res) => this.serviceOfProduct.getProductByCode(this.selectedEditItem.Code)))
            .subscribe((data) => {
                console.log(data);
                this.selectedEditItem = data;
            });
        this.serviceOfProduct.handleTriggerGetList();
    }

    handlePostAddAPI(addValue: any) {
        this.listProduct.unshift(addValue);
        this.pageData();
    }

    onEditProductDialog(code: number) {
        this.serviceOfProduct.getProductByCode(code).subscribe((data) => {
            this.selectedEditItem = data;
            this.addFormService.handleCheckTypeOfForm(true, this.selectedEditItem);
            console.log(this.selectedEditItem);
            this.isShowEditDialog = !this.isShowEditDialog;
        });
    }

    handleToggleEditDialog(value: boolean) {
        this.isShowEditDialog = value;
    }

    dataStateChange(e: any): void {
        this.page = e.skip / e.take + 1;
        this.serviceOfProduct.getListProduct(e).subscribe((data) => {
            this.listProduct = data.Data;
            this.totalProducts = data.Total;
            this.pageData();
        });
    }

    handleTestDataSource(): void {
        this.serviceOfProduct.testDataSource();
    }

    get isOpenForm(): boolean {
        return this.addFormService._isFormOpen;
    }
}
