import { Component, ElementRef, HostListener, Input, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ExpandEvent } from '@progress/kendo-angular-treelist';
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

const menuItems = [
    {
        iconName: 'WhitePencil',
        textName: 'Chỉnh sửa',
        fnName: 'editLocation'
    },
    {
        iconName: 'DepartmentIcon',
        textName: 'Thêm điểm làm việc',
        fnName: 'addLocation'
    },
    {
        iconName: 'DepartmentIcon',
        textName: 'Thêm điểm làm việc con',
        fnName: 'editChildLocation'
    },

]

@Component({
    selector: 'app-test-lisst',
    templateUrl: './test-lisst.component.html',
    styleUrls: ['./test-lisst.component.scss'],
})
export class TestLisstComponent {
    @ViewChild('boxIcon') boxIcon?: ElementRef;
    @ViewChildren('boxIcon') boxIcons?: QueryList<ElementRef>;
    public treeNodes: any[] = treeListData;
    public selectedPopupMenu: any[] = []
    public menuItemList: any[] = menuItems

    @Input() drawerView: any;

    constructor(private locationFormService: LocationFormService) {}
    ngOnInit(): void {
    }


    // Use an arrow function to capture the 'this' execution context of the class.
    public fetchChildren = (item: any): any[] => {
        return item.ListChild;
    };

    public hasChildren = (item: any): boolean => {
        return item.ListChild !== null;
    };

    toggleMenuPopup(code: any) {
        let newArr = []
        if (this.selectedPopupMenu.length == 0) {
            this.selectedPopupMenu.push(code)
        } else {
            if (!this.selectedPopupMenu.includes(code)) {
                newArr.push(code)
                this.selectedPopupMenu = [...newArr]
            } else if (this.selectedPopupMenu.includes(code)) {
                this.selectedPopupMenu.shift()
            }
        }
    }

        /**
     * The field that holds the keys of the expanded items.
     */
        private expandedIds: number[] = [  ];

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
            this.expandedIds = this.expandedIds.filter(id => id !== args.dataItem.Code);
            console.log(this.expandedIds);
            
        }
    
        /**
         * A `expand` event handler that will expand the item.
         */
        public onExpand(args: ExpandEvent): void {
            this.expandedIds.push(args.dataItem.Code);
            console.log(this.expandedIds)
        }

    onOpenForm(type: string) {
        this.drawerView.toggle()
        this.locationFormService.setTypeOfForm(type)
        this.selectedPopupMenu = []
    }
}
