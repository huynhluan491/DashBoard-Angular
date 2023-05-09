import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListlinkService } from 'src/app/assets/services/listlink.service';
import { LocationFormService } from '../../services/location-form.service';

@Component({
    selector: 'app-filter-bar',
    templateUrl: './filter-bar.component.html',
    styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent {
    searchInput: string = '';

    @Input() filterBoxItems: any;
    @Input() SearchValue!: string;
    @Input() isSearchValue?: boolean;
    @Input() searchQuery?: string;
    @Input() drawerView: any;
    @Output() onCheckSearchValue: EventEmitter<string> = new EventEmitter();
    @Output() handleResetType: EventEmitter<void> = new EventEmitter();
    constructor(private myService: ListlinkService, private structureFormService: LocationFormService) {}

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

    onOpenForm(type: string, data?: any) {
        console.log(this.drawerView);
        this.drawerView?.toggle();
        this.structureFormService.setTypeOfForm(type, data);
    }
}
