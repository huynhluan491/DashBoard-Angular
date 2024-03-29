import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
    product: object = new Object();
    constructor(private _route: ActivatedRoute, private productService: ProductService) {}

    title: string = '';
    body: string = '';
    result: any;
    ngOnInit(): void {}
}
