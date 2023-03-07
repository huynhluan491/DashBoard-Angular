import { Component, OnInit } from '@angular/core';
import { Link } from '../link';
import { ListlinkService } from '../assets/services/listlink.service';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    links: Link[] = [];
    filterData: Link[] = [];
    searchQuery?: string;
    isShowProduct: boolean = true;
    isShowPost: boolean = true;
    isShowSeeMore: boolean = false;
    constructor(private listLink: ListlinkService) {}

    ngOnInit(): void {
        this.getLinks();
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
        } else {
            if ((this.isShowProduct && this.isShowPost) || (!this.isShowProduct && !this.isShowPost)) {
                this.listLink.getLinksByDescription(this.searchQuery).subscribe((items) => {
                    this.filterData = items;
                    this.links = [];
                });
            }
            if (!this.isShowProduct && this.isShowPost) {
                this.listLink.getLinksByDescription(this.searchQuery).subscribe((items) => {
                    this.filterData = items.filter((item) => item.type != 'product');
                    this.links = [];
                });
            }
            if (this.isShowProduct && !this.isShowPost) {
                this.listLink.getLinksByDescription(this.searchQuery).subscribe((items) => {
                    this.filterData = items.filter((item) => item.type != 'post');
                    this.links = [];
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
        console.log(filter);
    };

    onResetFilter = () => {
        this.isShowPost = true;
        this.isShowProduct = true;
        this.getLinks();
    };

    onShowSeeMore = () => {
        this.isShowSeeMore = !this.isShowSeeMore;
        console.log(this.isShowSeeMore);
    };
}
