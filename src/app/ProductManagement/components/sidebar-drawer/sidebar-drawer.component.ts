import { Component } from '@angular/core';
import { DrawerItem, DrawerItemExpandedFn, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { items } from 'src/app/item';

@Component({
    selector: 'app-sidebar-drawer',
    templateUrl: './sidebar-drawer.component.html',
    styleUrls: ['./sidebar-drawer.component.scss'],
})
export class SidebarDrawerComponent {
    public selected = 'Danh sách nhân sự';
    public expanded = true;
    public expandedIndices = [6];

    public isItemExpanded: DrawerItemExpandedFn = (item): boolean => {
        return this.expandedIndices.indexOf(item.id) >= 0;
    };

    public items = items;

    public onSelect(ev: DrawerSelectEvent): void {
        this.selected = ev.item.text;
        const current = ev.item.id;

        if (ev.item.parentId) {
            this.items.map((item) => {
                if (item.id == ev.item.parentId) {
                    item.selected = true;
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
