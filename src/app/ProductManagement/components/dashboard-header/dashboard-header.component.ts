import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard-header',
    templateUrl: './dashboard-header.component.html',
    styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent {
    headerTitles = [
        { title: 'CẤU HÌNH', selected: false },
        { title: 'MUA HÀNG', selected: false },
        { title: 'KHO HÀNG', selected: false },
        { title: 'ĐIỀU PHỐI', selected: false },
        { title: 'MARKETING', selected: false },
        { title: 'E-COMMERCE', selected: true },
        { title: 'KINH DOANH', selected: false },
        { title: 'NHÂN SỰ', selected: false },
        { title: 'BÁO CÁO', selected: false },
    ];
    public kendokaAvatar =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23tJrqMtfoQzNfeGVJ9OGXlx3pu-31rBAPA&usqp=CAU';
}
