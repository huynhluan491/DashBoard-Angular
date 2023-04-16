import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
@Component({
    selector: 'app-test-lisst',
    templateUrl: './test-lisst.component.html',
    styleUrls: ['./test-lisst.component.scss'],
})
export class TestLisstComponent {
    newsData: any[] = [];
    listProduct: any[] = [];
    constructor(private productService: ProductService, private router: Router) {}
    ngOnInit(): void {
        // this.productService.getAllNews().subscribe((data) => {
        //     this.newsData = data;
        //     console.log(this.newsData);
        // });
        // this.productService.getListProduct().subscribe((data) => {
        //     this.listProduct = data;
        //     console.log(this.listProduct);
        // });
    }

    onProductClicked(dataItem: any) {
        this.router.navigate(['/news', dataItem.id]);
    }
}
