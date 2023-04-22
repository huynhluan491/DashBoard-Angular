import { Component } from '@angular/core';
import { DrawerItem, DrawerItemExpandedFn, DrawerSelectEvent } from '@progress/kendo-angular-layout';

@Component({
    selector: 'app-sidebar-drawer',
    templateUrl: './sidebar-drawer.component.html',
    styleUrls: ['./sidebar-drawer.component.scss'],
})
export class SidebarDrawerComponent {
    sideBarItems: Array<DrawerItem> = [
        {
            text: 'KHUYẾN MÃI',
            icon: 'k-i-inbox',
            id: 0,
        },
        {
            text: 'NỘI DUNG WEBSITE',
            icon: 'k-i-inbox',
            id: 1,
        },
        {
            text: 'QUẢN LÝ BANNER',
            icon: 'k-i-inbox',
            id: 3,
        },
        {
            text: 'CHÍNH SÁCH',
            icon: 'k-i-inbox',
            id: 4,
        },
        {
            text: 'Coupon',
            icon: 'k-i-inbox',
            id: 6,
            parentId: 4,
        },
        {
            text: 'Sub2',
            icon: 'k-i-inbox',
            id: 7,
            parentId: 4,
        },
        {
            text: 'Sub3',
            icon: 'k-i-inbox',
            id: 8,
            parentId: 4,
        },
        {
            text: 'BÁO CÁO EXCEL',
            icon: 'k-i-inbox',
            id: 5,
        },
    ];
    public selected = 'Coupon';
    public expanded = true;

    public onSelect(ev: DrawerSelectEvent): void {
        ev.preventDefault();
        this.selected = ev.item.text;
    }

    public switchExpanded(drawer: any): void {
        this.expanded = !this.expanded;
        drawer.toggle();
    }
}
