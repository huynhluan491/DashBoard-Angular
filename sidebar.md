template
import { Component, ViewEncapsulation } from '@angular/core';
import { DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { items } from './items';

@Component({
selector: 'my-app',
template: `
<div class="custom-toolbar">
<button kendoButton icon="menu" look="flat" (click)="ongToggle(drawer)"></button>
<span class="header"> Kendo UI for Angular Documentation </span>
</div>
<kendo-drawer-container>
<kendo-drawer #drawer [miniWidth]="90" [mini]="true" [items]="items" mode="push" [expanded]="true" [autoCollapse]="false" (select)="onSelect($event)">
<ng-template  kendoDrawerItemTemplate let-item>
<div class="k-level-{{ item.level }}" [ngClass]="item.selected ? 'selected' : ''">
<span class="k-icon {{ item.icon }}"></span>
<span *ngIf="item.expanded && item.children && isMini" class="k-icon k-i-arrow-chevron-down" style="margin-left: auto; line-height: inherit"></span>
<span *ngIf="!item.expanded && item.children && isMini" class="k-icon k-i-arrow-chevron-right" style="margin-left: auto; line-height: inherit"></span>
<span *ngIf="!isMini" [ngClass]="item.text == selected ? 'active' : ''">{{ item.text }}</span>
<span
*ngIf="item.expanded && item.children"
class="k-icon k-i-arrow-chevron-down"
style="margin-left: auto; line-height: inherit" ></span>
<span
\*ngIf="!item.expanded && item.children"
class="k-icon k-i-arrow-chevron-right"
style="margin-left: auto; line-height: inherit" ></span>
</div>

            </ng-template>

            </kendo-drawer>

            <kendo-drawer-content>
                <drawer-content [selectedItem]="selected"></drawer-content>
            </kendo-drawer-content>
        </kendo-drawer-container>
    `,

encapsulation: ViewEncapsulation.None,
styleUrls: ['./styles.css'],
})
export class AppComponent {
public selected;
public items = items.parents;
public itemIndex;
public isMini = false;

ongToggle(drawer) {
this.isMini = !this.isMini;
drawer.toggle();
}

public onSelect(ev: DrawerSelectEvent): void {
this.selected = ev.item.text;

    if (ev.item.parentId) {
      console.log(ev.item.parentId)
      this.items.map(item => {
        if (item.id == ev.item.parentId) {
          item.selected = true
        }
      }
      )
      console.log(this.items)
    } else {

    }

    const item = this.items.find((e, index) => {
      this.itemIndex = index;
      return e.text === ev.item.text;
    });

    item.expanded ? (item.expanded = false) : (item.expanded = true);

    if (ev.item.text === 'Getting Started') {
      item.expanded
        ? this.addChildren(items.gettingStarted)
        : this.removeChildren(items.gettingStarted);
    }
    if (ev.item.text === 'Overview') {
      item.expanded
        ? this.addChildren(items.overview)
        : this.removeChildren(items.overview);
    }

}

public addChildren(children) {
this.items.splice(this.itemIndex + 1, 0, ...children);
console.log(this.items);
}

public removeChildren(children: Array<any>) {
this.items.splice(this.itemIndex + 1, children.length);
}
}

---

my-app {
padding: 0;
font-family: 'Roboto', sans-serif;
}
kendo-drawer-container {
position: fixed;
width: 100%;
height: 100%;
}
.k-drawer-content {
padding: 15px;
}
.k-drawer-wrapper {
width: 243px !important;
}
.k-i-menu {
font-size: 25px;
}
.header {
margin-left: 8px;
font-weight: bold;
font-size: 20px;
}
.custom-toolbar {
width: 100%;
background-color: #f6f6f6;
border-bottom: inset;
border-bottom-width: 1px;
padding: 3px 8px;
color: #656565;
line-height: 50px;
}

.k-drawer-item {
background-color: #5A6276;
color: white;
padding: unset;
}

.k-level-1 {
padding-left: 20px;
background-color: #1A2334;
width: 100%;
color: #959DB3;
}
.example {
width: 300px;
height: 300px;
margin: 0 auto;
}
.kendoka {
margin: 0 auto;
width: 300px;
height: 300px;
background-size: cover;
background-image: url('https://www.telerik.com/kendo-angular-ui-develop/components/inputs/colorpicker/assets/kendoka.png');
}
.header {
text-align: center;
margin-bottom: 30px;
}

.k-state-selected {
background-color: unset !important;

}

.selected {
background-color: #1A2334;
width: 100%;
}

.active {
color: white;
}

---

export const items = {
parents: [
{
text: 'Getting Started',
icon: 'k-i-information',
expanded: false,
children: true,
selected: false,
id: 1
},
{
text: 'Overview',
icon: 'k-i-zoom',
expanded: false,
children: true,
selected: false,
id: 2
},
{
text: 'Most Popular Widgets',
icon: 'k-i-star',
expanded: false,
children: false,
selected: false,
id: 3
}
],

    overview: [
        {
            text: 'About Angular',
            icon: 'k-i-js',
            children: false,
            selected: false,
            level: 1,
            parentId: 2
        },
        {
            text: 'All Angular Components',
            icon: 'k-i-style-builder',
            children: false,
            selected: false,
            level: 1,
            parentId: 2
        }
    ],

    gettingStarted: [
        {
            text: 'About Kendo UI',
            icon: 'k-i-question',
            selected: false,
            level: 1,
            parentId: 1

        },
        {
            text: 'Supported Themes',
            icon: 'k-i-palette',
            selected: false,
            level: 1,
            parentId: 1
        }
    ]

};
