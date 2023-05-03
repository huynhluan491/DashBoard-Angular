import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { event } from 'jquery';
import { LocationFormService } from '../services/location-form.service';

@Component({
    selector: 'app-location-form',
    templateUrl: './location-form.component.html',
    styleUrls: ['./location-form.component.scss'],
})
export class LocationFormComponent implements OnInit, AfterViewInit {
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

    //state of dropdownlist
    public isDropDownOpen: boolean = false
    //up and down arrow of dropdown select
    public upArrow: any
    public downArrow: any
    
    // Declaring variables of selection value
    public selectedUnder = 1
    public selectedProvince = 1
    public selectedDistrict = 1
    public selectedWard = 1

    //Type of form
    public formType: string = ''

    listDropDownButton: any = []


    @Input() drawerView: any

    Under: any[] = [{ name: 'Văn phòng', value: 1 }, { name: 'Kho', value: 1 }];

    Provinces: any[] = [
        {
            name: 'Tp.Hồ Chí Minh',
            value: 1
        },
        {
            name: 'Hà Nội',
            value: 1
        },
        {
            name: 'Quảng Ninh',
            value: 1
        },
        {
            name: 'Đà Nẵng',
            value: 1
        },
        {
            name: 'Lào Cai',
            value: 1
        },
        {
            name: 'Tây Ninh',
            value: 1
        },
    ];

    Districts: any[] = [
        { name: 'Quận Gò Vấp', value: 1 },
        { name: 'Quận 1', value: 1 },
        { name: 'Quận 2', value: 1 },
        { name: 'Quận 3', value: 1 },
        { name: 'Quận 4', value: 1 },
        { name: 'Quận 5', value: 1 },
        { name: 'Quận 6', value: 1 },
        { name: 'Quận 7', value: 1 },
        { name: 'Quận 8', value: 1 },
        { name: 'Quận 9', value: 1 },
        { name: 'Quận 10', value: 1 },
        { name: 'Quận 11', value: 1 },
    ];

    Wards: any[] = [
        { name: 'Phường 1', value: 1 },
        { name: 'Phường 2', value: 1 },
        { name: 'Phường 3', value: 1 },
        { name: 'Phường 4', value: 1 },
        { name: 'Phường 5', value: 1 },
        { name: 'Phường 6', value: 1 },
        { name: 'Phường 7', value: 1 },
        { name: 'Phường 8', value: 1 },
        { name: 'Phường 9', value: 1 },
        { name: 'Phường 10', value: 1 },
        { name: 'Phường 11', value: 1 },
    ];

    constructor(private locationFormService: LocationFormService) {
        
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.listDropDownButton = Array.from(document.getElementsByClassName('k-input-button'))
        this.listDropDownButton.forEach((button: any) => {
            button.remove()
        })

        this.locationFormService.typeOfForm.subscribe(value => {
            this.formType = value
        })
    }
    

    handeCloseForm() {
        this.drawerView.toggle()
    }

    onOpen(ev: any) {        
        this.isDropDownOpen = true
    }

    onClose(ev: any) {
        this.isDropDownOpen = false
    }
}
