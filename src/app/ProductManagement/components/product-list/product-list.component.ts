import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { PageChangeEvent } from '@progress/kendo-angular-pager';
import { ProductService } from 'src/app/product.service';
import { Product, productList } from 'src/services/product';
import { ProductsService } from 'src/services/products.service';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { ProductManagementService } from '../../services/product-management.service';

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
    selecteDeleteItem: any;

    public state: State = {
        skip: 0,
        take: 5,
        filter: { filters: [], logic: 'or' },
        sort: [],
    };

    constructor(private serviceOfProduct: ProductService, private addFormService: ProductManagementService) {}

    ngOnInit(): void {
        this.getListProduct();
    }

    private getListProduct(): void {
        let body = {
            page: this.page,
            pageSize: this.state.take,
        };

        this.serviceOfProduct.getListProduct(body).subscribe((data) => {
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
        if (this.skip !== 0) {
            this.skip -= this.pageSize;
            this.page = this.skip / this.pageSize + 1;
            this.getListProduct();
        }
    }

    public onPageChange(e: PageChangeEvent): void {
        this.skip = e.skip;
        this.pageSize = e.take;
        this.page = this.skip / e.take + 1;
        this.pageData();
    }

    public goToNextPage() {
        if (this.skip >= this.totalProducts + 1 - this.pageSize) {
            this.skip = this.totalProducts + 1 - this.pageSize;
            this.getListProduct();
        } else {
            this.skip += this.pageSize;
            this.page = this.skip / this.pageSize + 1;
            this.getListProduct();
        }
    }

    public goToFirstPage() {
        this.skip = 0;
        this.page = 1;
        this.getListProduct();
    }

    public goToLastPage(total: any) {
        this.skip = this.totalProducts + 1 - this.pageSize; // skip to last page
        this.page = total;
        console.log(this.page);

        this.getListProduct();
    }

    onDeleteProduct(data: any) {
        this.serviceOfProduct.getProductByCode([data.Code]).subscribe((data) => {
            this.selecteDeleteItem = data;
            this.isDeleteDialogOpened = true;
        });
    }

    closeDeleteDialog(make: string) {
        if (make === 'yes') {
            this.isDeleteDialogOpened = false;
            window.alert('Deleted');
        } else {
            this.isDeleteDialogOpened = false;
            window.alert('Canceled');
        }
    }

    onEditProduct(id: any) {
        this.serviceOfProduct.getProductByCode([id]).subscribe((data) => {
            this.selectedEditItem = data;
            this.addFormService.handleOpenForm();
            this.addFormService.handleCheckTypeOfForm(false, this.selectedEditItem);
        });
    }

    dataStateChange(e: any): void {
        console.log(e);
        this.page = e.skip / e.take + 1;
        let order = {
            page: this.page,
            pageSize: e.take,
        };
        this.serviceOfProduct.getListProduct(order).subscribe((data) => {
            this.listProduct = data.Data;
            this.totalProducts = data.Total;
            this.pageData();
        });
    }

    handleTestDataSource(): void {
        this.serviceOfProduct.testDataSource();
    }
}
