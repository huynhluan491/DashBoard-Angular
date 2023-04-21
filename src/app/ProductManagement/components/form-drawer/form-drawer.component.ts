import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductManagementService } from '../../services/product-management.service';
import { DrawerMode, DrawerPosition } from '@progress/kendo-angular-layout';

@Component({
    selector: 'app-form-drawer',
    templateUrl: './form-drawer.component.html',
    styleUrls: ['./form-drawer.component.scss'],
})
export class FormDrawerComponent implements OnInit {
    @ViewChild('drawer') drawer: any;

    public expandMode: DrawerMode = 'overlay';
    public expanded = false;
    public position: DrawerPosition = 'end';

    constructor(private productForm: ProductManagementService) {}

    ngOnInit(): void {
        console.log(this.drawer);

        // this.productForm.myDrawerView =
    }

    handleToggle() {
        this.expanded = !this.expanded;
    }
}
