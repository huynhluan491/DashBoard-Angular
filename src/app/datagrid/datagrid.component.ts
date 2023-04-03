import { Component, Input, OnInit } from '@angular/core';
import { PageChangeEvent, PagerType } from '@progress/kendo-angular-pager';
import { Link } from '../link';
import { AddEvent, GridDataResult, RemoveEvent } from '@progress/kendo-angular-grid';
import { PopupMenuService } from '../popupmenu.service';
import { ListlinkService } from 'src/services/listlink.service';
import { FormService } from '../form-service.service';
import { listLink } from '../listLink';

@Component({
    selector: 'app-datagrid',
    templateUrl: './datagrid.component.html',
    styleUrls: ['./datagrid.component.scss'],
})
export class DatagridComponent implements OnInit {
    public gridView!: GridDataResult;

    public mySelection: number[] = [];
    public linkData: Link[] = listLink;

    public isNew?: boolean;
    public activeButton: any[] = [];

    public skip = 0;
    public pageSize = 3;
    public pagesizes = [2, 4, 6];
    public page = 1;
    public editDataItem!: Link;

    constructor(
        private popupMenu: PopupMenuService,
        private linkService: ListlinkService,
        private formService: FormService,
    ) {}

    ngOnInit(): void {
        this.linkService.getListLink().subscribe((list) => {
            this.linkData = list;
            this.loadItems();
        });
    }

    private loadItems(): void {
        this.gridView = {
            data: this.linkData.slice(this.skip, this.skip + this.pageSize),
            total: this.linkData.length,
        };
    }

    public goToPreviousPage() {
        if (this.skip !== 0) {
            this.skip -= this.pageSize;
            this.page = (this.skip + 3) / 3;
            this.loadItems();
        }
    }

    public goToNextPage() {
        if (this.skip >= this.linkData.length + 1 - this.pageSize) {
            this.skip = this.linkData.length + 1 - this.pageSize;
            this.loadItems();
        } else {
            this.skip += this.pageSize;
            this.page = (this.skip + 3) / 3;
            console.log(this.skip);
            this.loadItems();
        }
    }

    public pageChange(e: PageChangeEvent): void {
        this.skip = e.skip;
        this.page = (this.skip + 3) / 3;
        this.pageSize = e.take;
        this.loadItems();
    }

    public goToFirstPage() {
        this.skip = 0;
        this.loadItems();
    }

    public goToLastPage() {
        this.skip = this.linkData.length + 1 - this.pageSize; // skip to last page
        console.log(this.skip);

        this.loadItems();
    }

    public editHandler(args: AddEvent): void {
        this.editDataItem = args.dataItem;
        this.isNew = false;
        this.formService.handleCheckisNew(this.isNew, this.editDataItem);
        this.formService.handleOpenForm();
        this.activeButton = [];
    }
    public removeHandler(args: RemoveEvent): void {
        const itemId = args.dataItem.id;
        this.linkService.deleteLink(itemId);
    }

    handleActiveButton(id: number) {
        let idActive: any[] = [];
        if (this.activeButton.includes(id)) {
            this.activeButton = [];
        } else if (this.activeButton.length === 0) {
            idActive.push(id);
            this.activeButton = idActive;
        } else if (this.activeButton.length > 0) {
            this.activeButton.pop();
            this.activeButton.push(id);
        }
    }
}
