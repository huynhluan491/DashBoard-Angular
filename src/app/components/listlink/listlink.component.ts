import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ListlinkService } from 'src/app/assets/services/listlink.service';
import { Link } from 'src/app/link';

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
    availableListLink: Link[] = [];
    isShowMappingPopup: boolean = this.selectedListLink.length > 0 ? true : false;
    pageSize = 4;
    currentPage = 1;
    totalPages = Math.ceil(this.availableListLink.length / this.pageSize);

    @Input() onEditLink!: (id: number, link: object) => void;
    @Input() element!: any;
    @Input() link!: object;
    @Input() links: Link[] = [];
    @Input() id!: number;
    @Input() isShowSeeMore?: boolean = false;

    @Output() onShowSeeMore: EventEmitter<void> = new EventEmitter<void>();
    constructor(private myService: ListlinkService) {}

    ngOnInit(): void {
        this.myService.getListLink().subscribe((list) => {
            // subscribe to the Observable<Link[]> object
            this.availableListLink = list;
            this.totalPages = Math.ceil(this.availableListLink.length / this.pageSize); // update the total pages after the data is obtained
            this.updateDataSource(); // update the data source based on the current page
        });
        console.log(this.totalPages);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['links'].previousValue !== changes['links'].currentValue) {
            this.myService.getListLink().subscribe((list) => {
                this.availableListLink = list;
            });
        }
    }

    setActive(id: number) {
        if (id !== this.activeButton) {
            this.activeButton = id;
            this.isActive = !this.isActive;
            console.log(this.activeButton);
            this.selectedLink = this.links.find((l) => l.id === id);
            console.log(this.selectedLink); // or do whatever you need with the link object
        } else {
            this.activeButton = -1;
        }
    }

    handleDeleteLink = (id: number) => {
        this.myService.deleteLink(id);
        this.onShowSeeMore.emit();
        console.log(this.availableListLink);
        console.log(this.links);
    };

    handleOpenForm = () => {
        this.isShowEditForm = !this.isShowEditForm;
    };

    handleCloseEditForm = () => {
        this.isShowEditForm = false;
        console.log(this.isShowEditForm);
        this.activeButton = -1;
    };

    handleClick(id: number) {
        const link = this.links.find((l) => l.id === id);
        console.log(link); // or do whatever you need with the link object
    }

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
        this.selectedListLink = newSelectLink;
        console.log(this.selectedListLink);
    };

    addAllSelectedList = () => {
        this.links.map((item) => {
            if (!this.selectedListLink?.includes(item.id)) {
                this.selectedListLink?.push(item.id);
            }
        });
        console.log(this.selectedListLink);
    };

    handleDeleteMapping = () => {
        this.myService.deleteSelectedList(this.selectedListLink);
        this.selectedListLink = [];
        console.log(this.selectedListLink);
    };

    //PAGINATION
    // Define function to update data source based on current page
    updateDataSource() {
        this.availableListLink = this.links.slice(
            (this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize,
        );
    }

    // Define function to generate array of page numbers
    getPageNumbers() {
        const pageNumbers = [];
        for (let i = 1; i <= this.totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    }

    // Define click handler for page numbers
    goToPage(pageNumber: number) {
        this.currentPage = pageNumber;
        this.updateDataSource();
    }
}
