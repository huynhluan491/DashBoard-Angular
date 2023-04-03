import { Component } from '@angular/core';
import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
@Component({
    selector: 'app-actions-navigation',
    templateUrl: './actions-navigation.component.html',
    styleUrls: ['./actions-navigation.component.scss'],
})
export class ActionsNavigationComponent {
    public breadCrumbItems: BreadCrumbItem[] = [
        {
            text: 'CHÍNH SÁCH',
            title: 'CHÍNH SÁCH',
        },
        {
            text: 'COUPON',
            title: 'COUPON',
        },
        {
            text: 'CHI TIẾT ĐỢT PHÁT HÀNH',
            title: 'CHI TIẾT ĐỢT PHÁT HÀNH',
        },
    ];
}
