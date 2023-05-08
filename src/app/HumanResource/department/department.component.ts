import { Component, ElementRef, ViewChild } from '@angular/core';
import { DrawerMode, DrawerPosition } from '@progress/kendo-angular-layout';
import { ExpandEvent } from '@progress/kendo-angular-treelist';
import { Observable, of } from 'rxjs';
import { departmentList } from 'src/app/departmentItem';
import { LocationFormService } from '../services/location-form.service';
@Component({
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent {
    filterBoxItems = [
        {
            addTypeName: 'THÊM MỚI ĐƠN VỊ',
            iconUrl: 'DepartmentIcon.svg',
        },
        {
            addTypeName: 'THÊM MỚI ĐƠN VỊ CON',
            iconUrl: 'DepartmentIcon.svg',
        },
        {
            addTypeName: 'THÊM MỚI CHỨC DANH',
            iconUrl: 'DepartmentIcon.svg',
        },
    ];

    menuItemList = [
        {
            iconName: 'WhitePencil',
            textName: 'Chỉnh sửa',
            fnName: 'editDepartment',
        },
        {
            iconName: 'DepartmentIcon',
            textName: 'Thêm mới đơn vị',
            fnName: 'addNewDepartment',
        },
        {
            iconName: 'DepartmentIcon',
            textName: 'Thêm mới đơn vị con',
            fnName: 'addNewSubDepartment',
        },
        {
            iconName: 'DepartmentIcon',
            textName: 'Thêm mới chức danh',
            fnName: 'addNewPosition',
        },
    ];
    @ViewChild('drawer') drawer?: any;
    departmentList: any[] = departmentList;
    public selectedPopupMenu: any[] = [];
    private expandedIds: number[] = [1, 2];
    public expandMode: DrawerMode = 'overlay';
    public expanded = false;
    public position: DrawerPosition = 'end';
    public fetchChildren = (dataitem: any): Observable<any[]> => of(this.getItems(dataitem));

    constructor(private structureFormService: LocationFormService) {}

    public hasChildren = (item: any): boolean => {
        if (item.hasOwnProperty('ListPosition')) {
            console.log('property', item);
            return item.ListPosition.length > 0 || item.ListDepartment !== null;
        } else {
            console.log('!property', item);
            return false;
        }
    };

    getItems(dataitem: any) {
        let arr: any = [];

        if (dataitem.ListPosition) {
            arr = arr.concat(dataitem.ListPosition);
        }

        if (dataitem.ListDepartment) {
            arr = arr.concat(dataitem.ListDepartment);
        }

        return arr;
    }

    public isExpanded = (dataItem: any): boolean => {
        return this.expandedIds.indexOf(dataItem.Code) > -1;
    };

    public onCollapse(args: ExpandEvent): void {
        this.expandedIds = this.expandedIds.filter((id) => id !== args.dataItem.Code);
        console.log(this.expandedIds);
    }

    public onExpand(args: ExpandEvent): void {
        this.expandedIds.push(args.dataItem.Code);
        console.log(this.expandedIds);
    }

    toggleMenuPopup(code: any) {
        let newArr = [];
        if (this.selectedPopupMenu.length == 0) {
            this.selectedPopupMenu.push(code);
        } else {
            if (!this.selectedPopupMenu.includes(code)) {
                newArr.push(code);
                this.selectedPopupMenu = [...newArr];
            } else if (this.selectedPopupMenu.includes(code)) {
                this.selectedPopupMenu.shift();
            }
        }
    }

    handleOpenLocationForm(drawer: any) {
        drawer.toggle();
    }

    onOpenForm(type: string) {
        console.log(this.drawer);
        this.drawer?.toggle();
        this.structureFormService.setTypeOfForm(type);
        this.selectedPopupMenu = [];
    }
}
