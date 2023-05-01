import { Component } from '@angular/core';
import { DrawerMode, DrawerPosition } from '@progress/kendo-angular-layout';

@Component({
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent {
    public expandMode: DrawerMode = 'overlay';
    public expanded = false;
    public position: DrawerPosition = 'end';

    handleOpenLocationForm(drawer: any) {
        drawer.toggle();
    }
}
