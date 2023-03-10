import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Link } from '../link';
import { ListlinkService } from '../assets/services/listlink.service';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnChanges {
    links: Link[] = [];
    filterData: Link[] = [];
    searchQuery?: string;
    isShowProduct: boolean = true;
    isShowPost: boolean = true;
    isShowSeeMore: boolean = false;
    isShowAddForm: boolean = false;
    constructor(private listLink: ListlinkService) {}

    ngOnInit(): void {
        this.getLinks();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes) {
            this.getLinks();
        }
    }

    getLinks(): void {
        if (!this.searchQuery || this.searchQuery.length <= 0) {
            if ((this.isShowProduct && this.isShowPost) || (!this.isShowProduct && !this.isShowPost)) {
                this.listLink.getListLink().subscribe((x) => {
                    this.links = x;
                    this.filterData = [];
                });
            }
            if (!this.isShowProduct && this.isShowPost) {
                this.listLink.getListLink().subscribe((x) => {
                    this.filterData = x.filter((item) => item.type != 'product');
                });
            }
            if (this.isShowProduct && !this.isShowPost) {
                this.listLink.getListLink().subscribe((x) => {
                    this.filterData = x.filter((item) => item.type != 'post');
                });
            }
        } else if (this.searchQuery || this.searchQuery.length > 0) {
            if ((this.isShowProduct && this.isShowPost) || (!this.isShowProduct && !this.isShowPost)) {
                this.listLink.getLinksByDescription(this.searchQuery).subscribe((items) => {
                    this.filterData = items;
                    console.log(this.filterData);
                    console.log(this.links);
                });
            }
            if (!this.isShowProduct && this.isShowPost) {
                this.listLink.getLinksByDescription(this.searchQuery).subscribe((items) => {
                    this.filterData = items.filter((item) => item.type != 'product');
                });
            }
            if (this.isShowProduct && !this.isShowPost) {
                this.listLink.getLinksByDescription(this.searchQuery).subscribe((items) => {
                    this.filterData = items.filter((item) => item.type != 'post');
                });
            }
        }
    }
    onSearch = (searchValue: string) => {
        this.searchQuery = searchValue;
        this.getLinks();
    };

    onFilter = (filter: { post: boolean; product: boolean }) => {
        this.isShowPost = filter.post;
        this.isShowProduct = filter.product;
        this.getLinks();
    };

    onResetFilter = () => {
        this.isShowPost = true;
        this.isShowProduct = true;
        this.getLinks();
    };

    onShowSeeMore = () => {
        this.isShowSeeMore = !this.isShowSeeMore;
    };

    onShowAddForm = () => {
        this.isShowAddForm = !this.isShowAddForm;
    };

    onCloseForm() {
        this.isShowAddForm = false;
    }
}
