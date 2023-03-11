import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Link } from '../link';
import { ListlinkService } from '../assets/services/listlink.service';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    isShowAddForm: boolean = false;
    isSearchValue: boolean = false;

    constructor(private listLink: ListlinkService) {}

    ngOnInit(): void {}

    onCloseForm() {
        this.isShowAddForm = false;
    }

    onCheckSearchValue(input: string) {
        if (input) {
            this.isSearchValue = true;
        } else if (input.length == 0 || input == '') {
            this.isSearchValue = false;
        }
        console.log(this.isSearchValue);
    }
}
