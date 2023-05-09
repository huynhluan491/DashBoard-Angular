import { Component, OnInit } from '@angular/core';
import { DrawerMode, DrawerPosition } from '@progress/kendo-angular-layout';
import { LocationFormService } from '../../services/location-form.service';
import { menuItems } from 'src/app/locationMenuItem';
@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
    filterBoxItems = [
        {
            addTypeName: 'THÊM ĐIỂM LÀM VIỆC',
            iconUrl: 'DepartmentIcon.svg',
            fnName: 'addLocation',
        },
        {
            addTypeName: 'THÊM ĐIỂM LÀM VIỆC CON',
            iconUrl: 'DepartmentIcon.svg',
            fnName: 'addChildLocation',
        },
    ];

    public expandMode: DrawerMode = 'overlay';
    public expanded = false;
    public position: DrawerPosition = 'end';
    locationMenuItems: any[] = menuItems;

    constructor(private locationFormService: LocationFormService) {}

    ngOnInit(): void {}

    handleOpenLocationForm(drawer: any) {
        drawer.toggle();
    }
}
