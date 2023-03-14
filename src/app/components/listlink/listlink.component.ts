import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    SimpleChanges,
    OnChanges,
    ViewChild,
    HostListener,
    ElementRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ListlinkService } from 'src/app/assets/services/listlink.service';
import { Link } from 'src/app/link';
import { NgbConfig, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { listLink } from 'src/app/listLink';
@Component({
    selector: 'app-listlink',
    templateUrl: './listlink.component.html',
    styleUrls: ['./listlink.component.scss'],
})
export class ListlinkComponent implements OnInit, OnChanges {
    isActive: boolean = false;
    activeButton: number = -1;
    isShowEditForm!: boolean;
    selectedLink!: any;
    selectedListLink: any = [];
    selectAllItems: boolean = false;
    isShowSeeMore?: boolean = false;
    isShowPageSizeController?: boolean = false;
    availableListLink: Link[] = [];
    isShowMappingPopup: boolean = false;
    listLink: Link[] = listLink;
    page = 1;
    currentPage!: number;
    currentLinks!: Link[];

    pageSizeSelect: number[] = [2, 4, 6, 8];

    @Input() isSelectedAll: boolean = false;
    @Input() onEditLink!: (id: number, link: object) => void;
    @Input() element!: any;
    @Input() id!: number;
    @Input() isSearchValue?: boolean;
    pageSize = 4;
    constructor(private myService: ListlinkService, ngbConfig: NgbConfig, private eRef: ElementRef) {
        ngbConfig.animation = false;
    }

    ngOnInit(): void {
        this.myService.getListLink().subscribe((list) => {
            this.availableListLink = list;
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isSearchValue'].currentValue != changes['isSearchValue'].previousValue) {
            this.myService.getListLink().subscribe((list) => {
                this.availableListLink = list;
            });
        }
        console.log(this.availableListLink);
        console.log(changes);
    }

    get _availableListLink(): Link[] {
        let result: Link[] = [];
        const start = (this.page - 1) * this.pageSize;
        const end = start + this.pageSize;
        result = this.availableListLink.slice(start, end);
        console.log(result);
        return result;
    }

    setActive(id: number) {
        if (id !== this.activeButton) {
            this.activeButton = id;
            this.isActive = !this.isActive;
            this.selectedLink = this.availableListLink.find((item) => item.id === id);
        } else {
            this.activeButton = -1;
        }
    }

    handleDeleteLink = (id: number) => {
        this.myService.deleteLink(id);
        this.isActive = false;
    };

    handleOpenForm = () => {
        this.isShowEditForm = !this.isShowEditForm;
        this.isShowSeeMore = false;
    };

    handleCloseEditForm = () => {
        this.isShowEditForm = false;
        this.activeButton = -1;
    };

    onEditLinkHandler = (id: number, newLink: any) => {
        if (this.onEditLink) {
            this.onEditLink(id, newLink);
        }
    };

    addToSelectedList = (id: any) => {
        const idx = this.selectedListLink?.findIndex((item: { id: any }) => item == id);

        let newSelectLink: any;
        if (idx == -1) {
            newSelectLink = [...this.selectedListLink, id];
        } else if (idx != -1) {
            newSelectLink = this.selectedListLink.filter((item: { id: any }) => item != id);
        }
        if (newSelectLink.length > 0) {
            this.isShowMappingPopup = true;
        } else {
            this.isShowMappingPopup = false;
        }
        this.selectedListLink = newSelectLink;
        console.log(this.isShowMappingPopup);
        console.log(this.selectedListLink.length);
    };

    addAllSelectedList = (checked: any) => {
        if (checked.target.checked) {
            this.availableListLink.map((item) => {
                if (!this.selectedListLink?.includes(item.id)) {
                    this.selectedListLink?.push(item.id);
                }
            });
            this.isSelectedAll = true;
        } else {
            this.selectedListLink = [];
            this.isSelectedAll = false;
        }
        if (this.selectedListLink.length > 0) {
            this.isShowMappingPopup = true;
        } else {
            this.isShowMappingPopup = false;
        }
    };

    handleDeleteMapping = () => {
        this.myService.deleteSelectedList(this.selectedListLink);
        this.selectedListLink = [];
        this.isShowMappingPopup = false;
        this.isSelectedAll = false;
    };

    handleBackToFirst = () => {
        this.page = 1;
    };

    handleBackToLast = () => {
        this.page = this.availableListLink.length;
    };

    handleCloseMapping = () => {
        this.selectedListLink = [];
        this.isSelectedAll = false;
        this.isShowMappingPopup = false;
    };

    handleShowPageSizeController = () => {
        this.isShowPageSizeController = !this.isShowPageSizeController;
    };

    handleGetValueSelect = (value: number) => {
        this.pageSize = value;
        console.log(this.pageSize);
    };
}
