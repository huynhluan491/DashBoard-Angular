import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
    @Input() SearchValue!: string;
    @Input()
    requestSearch!: (searchValue: string) => void;

    searchFn(input: string) {
        this.requestSearch(input);
    }
}
