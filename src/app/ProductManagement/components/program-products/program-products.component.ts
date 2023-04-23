import { Component, Input, OnInit } from '@angular/core';
import { ProductManagementService } from '../../services/product-management.service';
import { DrawerMode, DrawerPosition } from '@progress/kendo-angular-layout';
import { Subject, debounceTime } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ProductService } from 'src/app/product.service';

@Component({
    selector: 'app-program-products',
    templateUrl: './program-products.component.html',
    styleUrls: ['./program-products.component.scss'],
})
export class ProgramProductsComponent implements OnInit {
    public expandMode: DrawerMode = 'overlay';
    public expanded = false;
    public position: DrawerPosition = 'end';

    searchValue: FormControl = new FormControl();

    constructor(private addFormService: ProductManagementService, private productService: ProductService) {}

    ngOnInit(): void {
        this.searchValue.valueChanges.pipe(debounceTime(500)).subscribe((value: string) => {
            console.log('search value: ', value);
            this.productService.setSearchValue(value);
        });
    }

    handleOpenForm(drawer: any) {
        this.addFormService.handleCheckTypeOfForm(true, undefined);
        this.addFormService.handleOpenForm();
        drawer.toggle();
    }
}
