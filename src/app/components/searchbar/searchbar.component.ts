import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListlinkService } from 'src/app/assets/services/listlink.service';

@Component({
    selector: 'app-searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
    searchInput: string = '';

    @Input() SearchValue!: string;
    @Input() isSearchValue?: boolean;
    @Input() searchQuery?: string;
    @Output() onCheckSearchValue: EventEmitter<string> = new EventEmitter();
    @Output() handleResetType: EventEmitter<void> = new EventEmitter();
    constructor(private myService: ListlinkService) {}

    ngOnInit(): void {}

    handleIconSearch = (input: any) => {
        this.myService.getSearchQuery(input.target.value);
        this.onCheckSearchValue.emit(input);
        this.myService.getListLink();
    };

    handleResetFilter = () => {
        this.myService.onResetFilter();
        this.handleResetType.emit();
    };
}
