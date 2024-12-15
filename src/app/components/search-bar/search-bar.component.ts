import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
    searchInput: string = '';
    allData: any[] = [];
    filteredData: any[] = [];

    ngOnInit() {
        this.initializeData();
    }

    initializeData() {
        // Hardcoded data, should be replaced with API call
        this.allData = [
            { id: 1, name: 'Item One' },
            { id: 2, name: 'Another Item' },
            { id: 3, name: 'Something Else' },
            { id: 4, name: 'Item Four' },
        ];
        this.filteredData = [...this.allData];
    }

    onSearchInputChange() {
        const input = this.searchInput.toLowerCase();
        if (!input || input.trim() === '') {
            this.filteredData = [...this.allData]; // Show all if empty
        } else {
            this.filteredData = this.allData.filter((item) => item.name.toLowerCase().includes(input));
        }
    }

    clearSearchInput() {
        this.searchInput = '';
        this.onSearchInputChange();
    }

    sortDataAscending() {
        this.filteredData.sort((a, b) => a.name.localeCompare(b.name));
    }

    sortDataDescending() {
        this.filteredData.sort((a, b) => b.name.localeCompare(a.name));
    }

    logFilteredData() {
        console.log('Filtered Data:', this.filteredData);
    }

    resetData() {
        this.filteredData = [...this.allData];
        this.searchInput = '';
    }
}
