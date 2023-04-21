import { Component, Input } from '@angular/core';
import { ProductManagementService } from '../../services/product-management.service';
import { DrawerMode, DrawerPosition } from '@progress/kendo-angular-layout';

@Component({
    selector: 'app-program-products',
    templateUrl: './program-products.component.html',
    styleUrls: ['./program-products.component.scss'],
})
export class ProgramProductsComponent {
    public expandMode: DrawerMode = 'overlay';
    public expanded = false;
    public position: DrawerPosition = 'end';
    constructor(private addFormService: ProductManagementService) {}

    handleOpenForm(drawer: any) {
        this.addFormService.handleCheckTypeOfForm(true, undefined);
        this.addFormService.handleOpenForm();
        drawer.toggle();
    }
}
