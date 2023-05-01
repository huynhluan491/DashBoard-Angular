import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-location-form',
    templateUrl: './location-form.component.html',
    styleUrls: ['./location-form.component.scss'],
})
export class LocationFormComponent implements OnInit {
    locationForm: FormGroup = new FormGroup({
        LocationName: new FormControl(''),
        LocationID: new FormControl(''),
        Brieft: new FormControl(''),
        Address: new FormControl(''),
        Province: new FormControl(''),
        District: new FormControl(''),
        Ward: new FormControl(''),
        Remark: new FormControl(''),
        StatusID: new FormControl(''),
    });

    Under: any[] = [{ name: 'Văn phòng' }, { name: 'Kho' }];

    Provinces: any[] = [
        {
            name: 'Tp.Hồ Chí Minh',
        },
        {
            name: 'Hà Nội',
        },
        {
            name: 'Quảng Ninh',
        },
        {
            name: 'Đà Nẵng',
        },
        {
            name: 'Lào Cai',
        },
        {
            name: 'Tây Ninh',
        },
    ];

    Districts: any[] = [
        { name: 'Quận Gò Vấp' },
        { name: 'Quận 1' },
        { name: 'Quận 2' },
        { name: 'Quận 3' },
        { name: 'Quận 4' },
        { name: 'Quận 5' },
        { name: 'Quận 6' },
        { name: 'Quận 7' },
        { name: 'Quận 8' },
        { name: 'Quận 9' },
        { name: 'Quận 10' },
        { name: 'Quận 11' },
    ];

    Wards: any[] = [
        { name: 'Phường 1' },
        { name: 'Phường 2' },
        { name: 'Phường 3' },
        { name: 'Phường 4' },
        { name: 'Phường 5' },
        { name: 'Phường 6' },
        { name: 'Phường 7' },
        { name: 'Phường 8' },
        { name: 'Phường 9' },
        { name: 'Phường 10' },
        { name: 'Phường 11' },
    ];

    ngOnInit(): void {}
}
