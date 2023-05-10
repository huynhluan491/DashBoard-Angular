import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { staffList } from '../../shared/staffsDemo';
import { State } from '@progress/kendo-data-query';
import * as $ from 'jquery';

@Component({
    selector: 'app-staff-list',
    templateUrl: './staff-list.component.html',
    styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent implements OnInit, AfterViewInit {
    //Kendo grid variables declaration
    gridView!: GridDataResult;
    sizes = [20, 50];
    listOfStaff: any[] = staffList;
    buttonCount = 10;
    page = 1;
    totalProducts = 0;

    mySelection: number[] = [];

    state: State = {
        skip: 0,
        take: 10,
        filter: {
            filters: [],
            logic: 'or',
        },
        sort: [],
    };

    ngOnInit(): void {
        this.pageData();
    }

    ngAfterViewInit(): void {
        $('.paging-wrapper .k-input-button .k-i-caret-alt-down').remove();
    }

    // call api to get data but still not used yet
    //   private getListProduct(): void {
    //     this.serviceOfProduct.getListProduct(this.state).subscribe((data) => {
    //         this.listProduct = data.Data;
    //         this.totalProducts = data.Total;
    //         this.pageData();
    //     });
    // }

    private pageData(): void {
        this.gridView = {
            data: this.listOfStaff,
            total: this.totalProducts,
        };
    }
}
