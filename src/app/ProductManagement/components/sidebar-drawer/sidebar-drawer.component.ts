import { Component } from '@angular/core';
import { DrawerItem, DrawerItemExpandedFn, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { items } from 'src/app/item';

@Component({
    selector: 'app-sidebar-drawer',
    templateUrl: './sidebar-drawer.component.html',
    styleUrls: ['./sidebar-drawer.component.scss'],
})
export class SidebarDrawerComponent {
    // public selected = 'Coupon';
    // public expanded = true;
    // public sidebarItems = this.items.parents;
    // public sideItems = this.items.parents;
    // public itemIndex: number = 0;

    // public onSelect(ev: DrawerSelectEvent): void {
    //     ev.preventDefault();
    //     this.selected = ev.item.text;
    //     if (ev.item.level !== 1) {
    //         this.sidebarItems = this.sidebarItems.map((i) => ({ ...i, selected: false })); // Deselecting all items as otherwise we end up with the wrong item selected.
    //         ev.preventDefault();
    //     }
    //     const item = this.sidebarItems.find((e: any, index: any) => {
    //         this.itemIndex = index;
    //         return e.text === ev.item.text;
    //     });

    //     if (ev.item.text !== this.selected) {
    //         item?.expanded ? (item.expanded = false) : (item!.expanded = true);
    //         console.log(item?.selected);

    //         item!.selected = !item?.selected;
    //     }

    //     if (!ev.item.children) {
    //         this.selected = ev.item.text;
    //     }

    //     console.log(item);

    //     if (ev.item.text === 'CHÍNH SÁCH') {
    //         item?.expanded ? this.addChildren(this.items.couponPolicy) : this.removeChildren(this.items.couponPolicy);
    //     }
    //     console.log(this.items);
    // }

    // public switchExpanded(drawer: any): void {
    //     this.expanded = !this.expanded;
    //     drawer.toggle();
    // }

    // public addChildren(children: any) {
    //     this.sidebarItems.splice(this.itemIndex + 1, 0, ...children);
    // }

    // public removeChildren(children: Array<any>) {
    //     this.sidebarItems.splice(this.itemIndex + 1, children.length);
    // }

    public selected = 'Inbox';
    public expanded = true;
    public expandedIndices = [2];

    public isItemExpanded: DrawerItemExpandedFn = (item): boolean => {
        console.log(item);
        console.log(this.expandedIndices);

        return this.expandedIndices.indexOf(item.id) >= 0;
    };

    public items = items;

    public onSelect(ev: DrawerSelectEvent): void {
        this.selected = ev.item.text;
        const current = ev.item.id;
        console.log(this.selected);

        if (ev.item.parentId) {
            this.items.map((item) => {
                if (item.id == ev.item.parentId) {
                    item.selected = true;
                    console.log(item);
                } else {
                    item.selected = false;
                }
            });
        } else {
            this.items.map((item) => {
                if (item.id !== ev.item.id) {
                    item.selected = false;
                } else {
                    item.selected = true;
                }
            });
        }

        if (this.expandedIndices.indexOf(current) >= 0) {
            this.expandedIndices = this.expandedIndices.filter((id) => id !== current);
        } else {
            this.expandedIndices.push(current);
        }
    }

    switchExpanded(drawer: any) {
        drawer.toggle();
        this.expanded = !this.expanded;
    }
}
