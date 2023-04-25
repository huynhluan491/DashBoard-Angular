import { Component } from '@angular/core';
import { DrawerItem, DrawerItemExpandedFn, DrawerSelectEvent } from '@progress/kendo-angular-layout';

@Component({
    selector: 'app-sidebar-drawer',
    templateUrl: './sidebar-drawer.component.html',
    styleUrls: ['./sidebar-drawer.component.scss'],
})
export class SidebarDrawerComponent {
    items = {
        parents: [
            {
                text: 'KHUYẾN MÃI',
                icon: 'k-i-inbox',
                expanded: false,
                children: false,
                selected: false,
                level: 0,
            },
            {
                text: 'NỘI DUNG WEBSITE',
                icon: 'k-i-inbox',
                expanded: false,
                children: false,
                selected: false,
                level: 0,
            },
            {
                text: 'QUẢN LÝ BANNER',
                icon: 'k-i-inbox',
                expanded: false,
                children: false,
                selected: false,
                level: 0,
            },
            {
                text: 'CHÍNH SÁCH',
                icon: 'k-i-inbox',
                expanded: false,
                children: true,
                selected: true,
                level: 0,
            },
            {
                text: 'BÁO CÁO EXCEL',
                icon: 'k-i-inbox',
                expanded: false,
                children: false,
                selected: false,
                level: 0,
            },
        ],

        couponPolicy: [
            {
                text: 'Coupon',
                children: false,
                selected: true,
                level: 1,
            },
            {
                text: 'PolicyX1',
                children: false,
                selected: false,
                level: 1,
            },
            {
                text: 'PolicyX2',
                expanded: false,
                children: false,
                selected: false,
                level: 1,
            },
            {
                text: 'PolicyX3',
                children: false,
                selected: false,
                level: 1,
            },
        ],
    };

    public selected = 'Coupon';
    public expanded = true;
    public sidebarItems = this.items.parents;
    public sideItems = this.items.parents;
    public itemIndex: number = 0;

    public onSelect(ev: DrawerSelectEvent): void {
        if (ev.item.level !== 1) {
            this.sidebarItems = this.sidebarItems.map((i) => ({ ...i, selected: false })); // Deselecting all items as otherwise we end up with the wrong item selected.
            ev.preventDefault();
        }
        const item = this.sidebarItems.find((e: any, index: any) => {
            this.itemIndex = index;
            return e.text === ev.item.text;
        });

        if (ev.item.text !== this.selected) {
            item?.expanded ? (item.expanded = false) : (item!.expanded = true);
            console.log(item?.selected);

            item!.selected = !item?.selected;
        }

        if (!ev.item.children) {
            this.selected = ev.item.text;
        }

        console.log(item);

        if (ev.item.text === 'CHÍNH SÁCH') {
            item?.expanded ? this.addChildren(this.items.couponPolicy) : this.removeChildren(this.items.couponPolicy);
        }
        console.log(this.items);
    }

    public switchExpanded(drawer: any): void {
        this.expanded = !this.expanded;
        drawer.toggle();
    }

    public addChildren(children: any) {
        this.sidebarItems.splice(this.itemIndex + 1, 0, ...children);
    }

    public removeChildren(children: Array<any>) {
        this.sidebarItems.splice(this.itemIndex + 1, children.length);
    }
}
