import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
    selector: 'app-searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
    @Input() SearchValue!: string;

    @Input() searchQuery?: string;
    @Output() onSearch: EventEmitter<string> = new EventEmitter();

    @Output() onResetFilter: EventEmitter<void> = new EventEmitter();

    ngOnChanges(changes: SimpleChanges) {
        if (changes['searchQuery']) {
            console.log(this.searchQuery);
            console.log(changes);
        }
    }

    handleIconSearch = (input: string) => {
        this.onSearch.emit(input);
        console.log(input);
    };
}
