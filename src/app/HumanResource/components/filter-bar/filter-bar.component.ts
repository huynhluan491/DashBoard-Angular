import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListlinkService } from 'src/app/assets/services/listlink.service';

@Component({
    selector: 'app-filter-bar',
    templateUrl: './filter-bar.component.html',
    styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent {
    searchInput: string = '';

    @Input() filterBoxItems: any
    @Input() SearchValue!: string;
    @Input() isSearchValue?: boolean;
    @Input() searchQuery?: string;
    @Output() onCheckSearchValue: EventEmitter<string> = new EventEmitter();
    @Output() handleResetType: EventEmitter<void> = new EventEmitter();
    constructor(private myService: ListlinkService) {}

    ngOnInit(): void {}

    handleEnterSearch = (input: any) => {
        console.log(input);

        this.myService.getSearchQuery(input.target.value);
        this.onCheckSearchValue.emit(input);
        this.myService.getListLink();
    };

    handleIconSearch = (input: any) => {
        console.log(input);
        this.myService.getSearchQuery(input);
        this.onCheckSearchValue.emit(input);
        this.myService.getListLink();
    };

    handleResetFilter = () => {
        this.myService.onResetFilter();
        this.handleResetType.emit();
    };
}
