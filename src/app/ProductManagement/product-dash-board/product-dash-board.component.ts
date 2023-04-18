import { Component } from '@angular/core';
import { ProductManagementService } from '../services/product-management.service';

@Component({
    selector: 'app-product-dash-board',
    templateUrl: './product-dash-board.component.html',
    styleUrls: ['./product-dash-board.component.scss'],
})
export class ProductDashBoardComponent {
    sideBar = [
        {
            title: 'KHUYẾN MÃI',
            subMenu: [],
            active: false,
        },
        {
            title: 'NỘI DUNG WEBSITE',
            subMenu: [],
            active: false,
        },
        {
            title: 'QUẢN LÝ BANNER',
            subMenu: [],
            active: false,
        },
        {
            title: 'CHÍNH SÁCH',
            subMenu: ['Coupon', 'xxxxxxxxxxxxx', 'xxxxxxxxxxxxx', 'xxxxxxxxxxxxx', 'xxxxxxxxxxxxx', 'xxxxxxxxxxxxx'],
            active: true,
        },
        {
            title: 'BÁO CÁO EXCEL',
            subMenu: [],
            active: false,
        },
    ];
}
