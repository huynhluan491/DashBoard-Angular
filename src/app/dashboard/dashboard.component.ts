import { Component, OnChanges, OnInit } from '@angular/core';
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
    constructor(private listLink: ListlinkService) {}

    ngOnInit(): void {
        this.getLinks();
    }

    ngOnChanges(): void {
        this.getLinks();
    }

    getLinks(): void {
        if (!this.searchQuery || this.searchQuery.length <= 0) {
            this.listLink.getListLink().subscribe((x) => {
                console.log(x);
                this.links = x;
                this.filterData = [];
            });
        } else {
            this.listLink.getLinksByDescription(this.searchQuery).subscribe((item) => {
                console.log(item);
                this.filterData = item;
                this.links = [];
            });
        }
    }
    requestSearch = (searchValue: string) => {
        this.searchQuery = searchValue;
        this.getLinks();
    };
}
