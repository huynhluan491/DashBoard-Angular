import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ColumnBase, ExpandEvent, SelectableSettings, SelectionChangeEvent } from '@progress/kendo-angular-treelist';
import { LocationFormService } from '../HumanResource/services/location-form.service';

const treeListData = [
    {
        ParentCode: null,
        ProvinceCode: null,
        DistrictCode: null,
        WardCode: null,
        StatusName: 'Duyệt áp dụng',
        ListChild: [
            {
                ParentCode: null,
                ProvinceCode: null,
                DistrictCode: null,
                WardCode: null,
                StatusName: 'Duyệt áp dụng',
                ListChild: [
                    {
                        ParentCode: null,
                        ProvinceCode: null,
                        DistrictCode: null,
                        WardCode: null,
                        StatusName: 'Duyệt áp dụng',
                        ListChild: null,
                        Code: 3,
                        ParentID: 2,
                        LocationID: 'DP42',
                        LocationName: 'Kho 42',
                        Brieft: null,
                        Address: null,
                        Province: null,
                        District: null,
                        Ward: null,
                        Remark: null,
                        StatusID: 2,
                    },
                ],
                Code: 2,
                ParentID: 1,
                LocationID: 'LO42',
                LocationName: 'Văn phòng 42',
                Brieft: null,
                Address: null,
                Province: null,
                District: null,
                Ward: null,
                Remark: null,
                StatusID: 2,
            },
        ],
        Code: 1,
        ParentID: null,
        LocationID: 'HW40',
        LocationName: 'Văn phòng 40',
        Brieft: null,
        Address: null,
        Province: null,
        District: null,
        Ward: null,
        Remark: null,
        StatusID: 2,
    },
    {
        ParentCode: null,
        ProvinceCode: null,
        DistrictCode: null,
        WardCode: null,
        StatusName: 'Duyệt áp dụng',
        ListChild: null,
        Code: 4,
        ParentID: null,
        LocationID: 'OW40',
        LocationName: 'Kho Online',
        Brieft: null,
        Address: null,
        Province: null,
        District: null,
        Ward: null,
        Remark: null,
        StatusID: 2,
    },
    {
        ParentCode: null,
        ProvinceCode: null,
        DistrictCode: null,
        WardCode: null,
        StatusName: 'Duyệt áp dụng',
        ListChild: null,
        Code: 5,
        ParentID: null,
        LocationID: 'HC01',
        LocationName: 'Hachi Hachi NVT',
        Brieft: null,
        Address: null,
        Province: null,
        District: null,
        Ward: null,
        Remark: null,
        StatusID: 2,
    },
    {
        ParentCode: null,
        ProvinceCode: null,
        DistrictCode: null,
        WardCode: null,
        StatusName: 'Duyệt áp dụng',
        ListChild: null,
        Code: 6,
        ParentID: null,
        LocationID: 'HC02',
        LocationName: 'Hachi Hachi PMH',
        Brieft: null,
        Address: null,
        Province: null,
        District: null,
        Ward: null,
        Remark: null,
        StatusID: 2,
    },
    {
        ParentCode: null,
        ProvinceCode: null,
        DistrictCode: null,
        WardCode: null,
        StatusName: 'Duyệt áp dụng',
        ListChild: null,
        Code: 7,
        ParentID: null,
        LocationID: 'HC03',
        LocationName: 'Hachi Hachi CMT8',
        Brieft: null,
        Address: null,
        Province: null,
        District: null,
        Ward: null,
        Remark: null,
        StatusID: 2,
    },
    {
        ParentCode: null,
        ProvinceCode: null,
        DistrictCode: null,
        WardCode: null,
        StatusName: 'Duyệt áp dụng',
        ListChild: null,
        Code: 8,
        ParentID: null,
        LocationID: 'HC04',
        LocationName: 'Hachi Hachi PT',
        Brieft: null,
        Address: null,
        Province: null,
        District: null,
        Ward: null,
        Remark: null,
        StatusID: 2,
    },
    {
        ParentCode: null,
        ProvinceCode: null,
        DistrictCode: null,
        WardCode: null,
        StatusName: 'Duyệt áp dụng',
        ListChild: null,
        Code: 9,
        ParentID: null,
        LocationID: 'HC05',
        LocationName: 'Hachi Hachi QT',
        Brieft: null,
        Address: null,
        Province: null,
        District: null,
        Ward: null,
        Remark: null,
        StatusID: 2,
    },
    {
        ParentCode: null,
        ProvinceCode: null,
        DistrictCode: null,
        WardCode: null,
        StatusName: 'Duyệt áp dụng',
        ListChild: null,
        Code: 10,
        ParentID: null,
        LocationID: 'HC06',
        LocationName: 'Hachi Hachi DXH',
        Brieft: null,
        Address: null,
        Province: null,
        District: null,
        Ward: null,
        Remark: null,
        StatusID: 2,
    },
];

@Component({
    selector: 'app-test-lisst',
    templateUrl: './test-lisst.component.html',
    styleUrls: ['./test-lisst.component.scss'],
})
export class TestLisstComponent implements OnInit {
    @ViewChild('boxIcon') boxIcon?: ElementRef;
    @ViewChildren('boxIcon') boxIcons?: QueryList<ElementRef>;
    public treeNodes: any[] = treeListData;
    public selectedPopupMenu: any[] = [];
    private expandedIds: number[] = [];
    public selectItem: any[] = [];
    @Input() menuItemList: any;
    @Input() drawerView: any;

    constructor(private locationFormService: LocationFormService) {}
    ngOnInit(): void {
        this.clearSelection(this.treeNodes);
    }

    public settings: SelectableSettings = {
        mode: 'row',
        multiple: true,
        drag: false,
    };

    // Use an arrow function to capture the 'this' execution context of the class.
    public fetchChildren = (item: any): any[] => {
        return item.ListChild;
    };

    public hasChildren = (item: any): boolean => {
        return item.ListChild !== null;
    };

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

    /**
     * The field that holds the keys of the expanded items.
     */

    /**
     * A function that determines whether a given item is expanded.
     */
    public isExpanded = (dataItem: any): boolean => {
        return this.expandedIds.indexOf(dataItem.Code) > -1;
    };

    /**
     * A `collapse` event handler that will collapse the item.
     */
    public onCollapse(args: ExpandEvent): void {
        this.expandedIds = this.expandedIds.filter((id) => id !== args.dataItem.Code);
        console.log(this.expandedIds);
    }

    /**
     * A `expand` event handler that will expand the item.
     */
    public onExpand(args: ExpandEvent): void {
        this.expandedIds.push(args.dataItem.Code);
        console.log(this.expandedIds);
    }

    onOpenForm(type: string, data: any) {
        this.drawerView.toggle();
        this.locationFormService.setTypeOfForm(type, data);
        this.selectedPopupMenu = [];
    }

    public isSelected(dataItem: any, column?: ColumnBase, columnIndex?: number) {
        return dataItem.selected;
    }

    onChange(e: SelectionChangeEvent) {
        // set items selected property to false before set new selected item `selected` prop to true
        if (e.action === 'select') {
            this.clearSelection(this.treeNodes);
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

        // this.selectedDepartmentItem = [{ ...data }];
        // console.log(this.selectedDepartmentItem);

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
            if (item.ListChild) {
                this.clearSelection(item.ListChild);
            }
        });
    }
}
