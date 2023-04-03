import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    public productList = [
        {
            barcode: '4990000001',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000002',
            productName: 'Hộp đựng có nắp đậy Sanka size M - Nâu',
        },
        {
            barcode: '4990000003',
            productName: 'Hộp đựng có nắp đậy Sanka size L - Nâu',
        },
        {
            barcode: '4990000004',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000005',
            productName: 'Hộp đựng có nắp đậy Sanka size M - Nâu',
        },
        {
            barcode: '4990000006',
            productName: 'Hộp đựng có nắp đậy Sanka size L - Nâu',
        },
        {
            barcode: '4990000007',
            productName: 'Hộp đựng có nắp đậy Sanka size L - Nâu',
        },
        {
            barcode: '4990000008',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000009',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000009',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000010',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000011',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000012',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000013',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000014',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000015',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000016',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000017',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000018',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000019',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000020',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000021',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000022',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000023',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000024',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000025',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000026',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000027',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000028',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000029',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000030',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000031',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
        {
            barcode: '4990000032',
            productName: 'Hộp đựng có nắp đậy Sanka size S - Nâu',
        },
    ];
    private listProduct$ = new BehaviorSubject<Product[]>(this.productList);
    constructor() {}

    getListProduct(): Observable<Product[]> {
        this.listProduct$.next(this.productList);

        return this.listProduct$.asObservable();
    }

    handleDeleteProduct(barcode: string) {
        const newProductList = this.productList.filter((item) => item.barcode !== barcode);
        this.productList = newProductList;
        this.getListProduct();
    }
}
