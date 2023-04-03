import { Component, OnInit } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { PageChangeEvent } from '@progress/kendo-angular-pager';
import { Product, productList } from 'src/services/product';
import { ProductsService } from 'src/services/products.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
    public gridView!: GridDataResult;
    public products: Product[] = productList;
    public productPage: Product[] = [];
    public pageSize = 20;
    public skip = 0;
    public sizes = [20, 50];
    public buttonCount = 10;
    public page = 1;

    constructor(private productService: ProductsService) {}

    ngOnInit(): void {
        this.productService.getListProduct().subscribe((list) => {
            this.products = list;
            console.log(this.products);

            this.pageData();
        });
    }
    private pageData(): void {
        this.gridView = {
            data: this.products.slice(this.skip, this.skip + this.pageSize),
            total: this.products.length,
        };
    }

    public goToPreviousPage() {
        if (this.skip !== 0) {
            this.skip -= this.pageSize;
            this.page = (this.skip + 3) / 3;
            this.pageData();
        }
    }

    public onPageChange(e: PageChangeEvent): void {
        this.skip = e.skip;
        this.pageSize = e.take;
        this.page = (this.skip + 3) / 3;

        this.pageData();
    }

    public goToNextPage() {
        if (this.skip >= this.products.length + 1 - this.pageSize) {
            this.skip = this.products.length + 1 - this.pageSize;
            this.pageData();
        } else {
            this.skip += this.pageSize;
            console.log(this.skip);
            this.page = (this.skip + 3) / 3;

            this.pageData();
        }
    }

    public goToFirstPage() {
        this.skip = 0;
        this.page = 1;
        this.pageData();
    }

    public goToLastPage(total: any) {
        this.skip = this.products.length + 1 - this.pageSize; // skip to last page
        this.page = total;
        console.log(this.skip);

        console.log(this.page);

        this.pageData();
    }

    onDeleteProduct(id: string) {
        this.productService.handleDeleteProduct(id);
    }
}
