import { Component, OnInit } from '@angular/core';
import { DrawerMode, DrawerPosition } from '@progress/kendo-angular-layout';
import { LocationFormService } from '../../services/location-form.service';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})
export class DepartmentComponent implements OnInit {
    public expandMode: DrawerMode = 'overlay';
    public expanded = false;
    public position: DrawerPosition = 'end';

    constructor(private locationFormService: LocationFormService) {

    }

    ngOnInit(): void {

    }
    
    handleOpenLocationForm(drawer: any) {
        drawer.toggle();
        
    }

}
