import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawerMode, DrawerPosition } from '@progress/kendo-angular-layout';
import { ColumnBase, ExpandEvent, SelectableSettings, SelectionChangeEvent } from '@progress/kendo-angular-treelist';
import { Observable, of } from 'rxjs';
import { departmentList } from 'src/app/departmentItem';
import { LocationFormService } from '../services/location-form.service';
@Component({
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
    filterBoxItems = [
        {
            addTypeName: 'THÊM MỚI ĐƠN VỊ',
            iconUrl: 'DepartmentIcon.svg',
            fnName: 'addNewDepartment',
        },
        {
            addTypeName: 'THÊM MỚI ĐƠN VỊ CON',
            iconUrl: 'DepartmentIcon.svg',
            fnName: 'addNewDepartment',
        },
        {
            addTypeName: 'THÊM MỚI CHỨC DANH',
            iconUrl: 'DepartmentIcon.svg',
            fnName: 'addNewPosition',
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
    public selectItem: any[] = [];
    selectedDepartmentItem: any = [];
    underParentName: string = '';

    public settings: SelectableSettings = {
        mode: 'row',
        multiple: true,
    };

    constructor(private structureFormService: LocationFormService) {}

    ngOnInit(): void {
        this.clearSelection(this.departmentList);
    }

    public hasChildren = (item: any): boolean => {
        if (item.hasOwnProperty('ListPosition')) {
            return item.ListPosition.length > 0 || item.ListDepartment !== null;
        } else {
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

    onOpenForm(type: string, data?: any) {
        this.selectedPopupMenu = [];
        if (data.ParentID == null && data.Department) {
            this.recursionCheck(this.departmentList, -1);
        } else if (data.Department && data.ParentID != null) {
            this.recursionCheck(this.departmentList, data.ParentID);
        } else if (data.Position && data.DepartmentID) {
            this.recursionCheck(this.departmentList, data.DepartmentID);
        }
        this.structureFormService.setUnderParentName(this.underParentName);
        this.drawer?.toggle();
        this.structureFormService.setTypeOfForm(type, data);
    }

    getSelectItem(name: string) {
        let newArr = [];
        if (this.selectItem.length == 0) {
            this.selectItem.push(name);
        } else {
            if (!this.selectItem.includes(name)) {
                newArr.push(name);
                this.selectItem = [...newArr];
            } else if (this.selectItem.includes(name)) {
                this.selectItem.shift();
            }
        }
        console.log(this.selectItem);
    }

    public isSelected(dataItem: any, column?: ColumnBase, columnIndex?: number) {
        return dataItem.selected;
    }

    onChange(e: SelectionChangeEvent) {
        // set items selected property to false before set new selected item `selected` prop to true
        if (e.action === 'select') {
            this.clearSelection(this.departmentList);
        }

        const data = e.items[0].dataItem;
        let name = '';
        let newArr = [];

        if (data.Department) {
            name = data.Department;
        } else if (data.DepartmentName) {
            name = data.DepartmentName;
        } else if (data.Position) {
            name = data.Position;
        }

        this.selectedDepartmentItem = [{ ...data }];
        console.log(this.selectedDepartmentItem);

        if (this.selectItem.length == 0) {
            this.selectItem.push(name);
        } else {
            if (!this.selectItem.includes(name)) {
                newArr.push(name);
                this.selectItem = [...newArr];
            } else if (this.selectItem.includes(name)) {
                this.selectItem.shift();
            }
        }

        const selected = e.action === 'select';
        e.items.forEach((item) => (item.dataItem.selected = selected));
    }

    // Using recursion to set items selected to false
    private clearSelection(items: any[]): void {
        items.forEach((item: any) => {
            item.selected = false;
            if (item.ListDepartment) {
                this.clearSelection(item.ListDepartment);
            }
            if (item.ListPosition) {
                this.clearSelection(item.ListPosition);
            }
            if (item.ListLocation) {
                this.clearSelection(item.ListLocation);
            }
        });
    }

    private recursionCheck(items: any[], code: number): any {
        let found = 0;
        if (code == -1) {
            return 'root';
        } else {
            items.forEach((item: any): any => {
                console.log(item);

                if (item.Code == code) {
                    found += 1;
                    this.underParentName = item.Department;
                } else if (item.Code == code) {
                    found += 1;
                    this.underParentName = item.Department;
                }
                console.log('check', this.underParentName);
                if (found !== 1) {
                    if (item.ListDepartment) {
                        this.recursionCheck(item.ListDepartment, code);
                    }
                    if (item.ListPosition) {
                        this.recursionCheck(item.ListPosition, code);
                    }
                } else {
                    return 0;
                }
            });
        }
    }
}
