import {
    Component,
    ComponentFactoryResolver,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { PageChangeEvent } from '@progress/kendo-angular-pager';
import { ProductService } from 'src/app/product.service';
import { Product, productList } from 'src/services/product';
import { ProductsService } from 'src/services/products.service';
import { State, toDataSourceRequest } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { ProductManagementService } from '../../services/product-management.service';
import { DrawerItem, DrawerMode, DrawerPosition, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { AddProductFormComponent } from '../add-product-form/add-product-form.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
    public gridView!: GridDataResult;
    public view: Observable<any> | undefined;
    public products: Product[] = productList;
    public productPage: Product[] = [];
    public pageSize = 10;
    public skip = 0;
    public sizes = [10, 50];
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
        take: this.pageSize,
        filter: { filters: [], logic: 'or' },
        sort: [{ field: 'Code', dir: 'desc' }],
    };

    constructor(
        private serviceOfProduct: ProductService,
        private addFormService: ProductManagementService,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {}

    ngOnInit(): void {
        this.getListProduct();
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
            this.skip -= this.pageSize;
            this.state.skip! -= this.pageSize;
            console.log(this.state.skip);

            this.getListProduct();
        }
    }

    public onPageChange(e: PageChangeEvent): void {
        this.state.skip = e.skip;
        this.page = this.state.skip / e.take + 1;
        this.pageData();
    }

    public goToNextPage() {
        if (this.state.skip! >= this.totalProducts + 1 - this.pageSize) {
            this.state.skip = 0;
            this.getListProduct();
        } else {
            this.state.skip! += this.pageSize;
            this.getListProduct();
        }
    }

    public goToFirstPage() {
        this.state.skip = 0;
        this.page = 1;
        this.getListProduct();
    }

    public goToLastPage(total: any) {
        console.log(total);

        this.state.skip = this.totalProducts + 1 - this.state.take!; // skip to last page
        this.page = Math.round(this.state.skip / this.state.take! + 1);
        console.log(this.page);
        this.getListProduct();
    }

    onDeleteProduct(code: number) {
        this.serviceOfProduct.getProductByCode(code).subscribe((data) => {
            this.selectedDeleteItem = data;
            this.isDeleteDialogOpened = true;
        });
    }

    closeDeleteDialog(make: string) {
        if (make === 'yes') {
            this.isDeleteDialogOpened = false;
            this.listProduct = this.listProduct.filter((item) => item.Code !== this.selectedDeleteItem.Code);
            this.pageData();
            console.log(this.listProduct);
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
            this.addFormService.handleCheckTypeOfForm(false, this.selectedEditItem);
            this.drawerView.toggle();
        });
    }

    handlePostEditAPI(updateInfo: any) {
        const idProduct = this.selectedEditItem.Code;
        const Idx = this.listProduct.findIndex((item) => item.Code === idProduct);

        if (Idx > -1) {
            this.listProduct[Idx] = updateInfo;
            this.pageData();
            console.log(this.listProduct);
        }
    }

    handlePostAddAPI(addValue: any) {
        this.listProduct.unshift(addValue);
        this.pageData();
    }

    onEditProductDialog(code: number) {
        this.serviceOfProduct.getProductByCode(code).subscribe((data) => {
            this.selectedEditItem = data;
            this.addFormService.handleCheckTypeOfForm(false, this.selectedEditItem);
            console.log(this.selectedEditItem);
            this.isShowEditDialog = !this.isShowEditDialog;
        });
    }

    handleToggleEditDialog(value: boolean) {
        this.isShowEditDialog = value;
    }

    dataStateChange(e: any): void {
        console.log(e);

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
