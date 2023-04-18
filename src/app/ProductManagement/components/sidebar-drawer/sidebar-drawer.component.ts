import { Component } from '@angular/core';
import { DrawerItem, DrawerItemExpandedFn, DrawerSelectEvent } from '@progress/kendo-angular-layout';

@Component({
    selector: 'app-sidebar-drawer',
    templateUrl: './sidebar-drawer.component.html',
    styleUrls: ['./sidebar-drawer.component.scss'],
})
export class SidebarDrawerComponent {
    items = [
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

    public expandedIndices = [2];

    public isItemExpanded: DrawerItemExpandedFn = (item): boolean => {
        return this.expandedIndices.indexOf(item.id) >= 0;
    };

    public sideBarItems: Array<DrawerItem> = this.items;

    public onSelect(ev: DrawerSelectEvent): void {
        this.selected = ev.item.text;
        console.log(this.selected);

        const current = ev.item.id;

        if (this.expandedIndices.indexOf(current) >= 0) {
            this.expandedIndices = this.expandedIndices.filter((id) => id !== current);
        } else {
            this.expandedIndices.push(current);
        }
    }
}
