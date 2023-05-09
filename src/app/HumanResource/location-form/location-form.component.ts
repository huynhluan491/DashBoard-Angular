import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

    departmentForm: FormGroup = new FormGroup({
        DepartmentName: new FormControl(''),
        DepartmentID: new FormControl(''),
        Brieft: new FormControl(''),
        UnderDepartment: new FormControl(''),
        LocationName: new FormControl(''),
        Phone: new FormControl(''),
        Fax: new FormControl(''),
        Feature: new FormControl(''),
        StatusID: new FormControl(''),
        Under: new FormControl(['Baseball']),
        selectedUnder: new FormControl(1),
    });

    positionForm: FormGroup = new FormGroup({
        positionName: new FormControl(''),
        positionID: new FormControl(''),
        isLeader: new FormControl(false),
        departmentID: new FormControl(''),
        adminFeature: new FormControl(''),
        group: new FormControl(''),
        role: new FormControl(''),
        StatusID: new FormControl(''),
    });

    //state of dropdownlist
    public isDropDownOpen: boolean = false;
    //up and down arrow of dropdown select
    public upArrow: any;
    public downArrow: any;

    // Declaring variables of selection value
    public selectedProvince = 1;
    public selectedDistrict = 1;
    public selectedWard = 1;

    //Type of form
    public formType: string = '';
    isEdit: boolean = false;
    selectedItem: any;

    listDropDownButton: any = [];

    @Input() drawerView: any;

    Under: any[] = [];

    Provinces: any[] = [
        {
            name: 'Tp.Hồ Chí Minh',
            value: 1,
        },
        {
            name: 'Hà Nội',
            value: 1,
        },
        {
            name: 'Quảng Ninh',
            value: 1,
        },
        {
            name: 'Đà Nẵng',
            value: 1,
        },
        {
            name: 'Lào Cai',
            value: 1,
        },
        {
            name: 'Tây Ninh',
            value: 1,
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

    public listItems: Array<string> = [
        'Baseball',
        'Basketball',
        'Cricket',
        'Field Hockey',
        'Football',
        'Table Tennis',
        'Tennis',
        'Volleyball',
    ];

    constructor(private locationFormService: LocationFormService) {}

    ngOnInit(): void {
        this.formType = this.locationFormService._typeOfForm;
        this.selectedItem = this.locationFormService._selectedItem;
        let name = this.locationFormService._UnderParentName;
        console.log(name);

        this.Under.push({
            name: name,
            value: 1,
        });

        if (
            this.formType == 'editChildLocation' ||
            this.formType == 'editDepartment' ||
            this.formType == 'editLocation'
        ) {
            this.isEdit = true;
        } else {
            this.isEdit = false;
        }

        if (this.formType == 'editLocation') {
            this.locationForm.controls['LocationName'].setValue(this.selectedItem.LocationName);
        } else if (this.formType == 'editDepartment') {
            if (this.selectedItem.Department) {
                this.departmentForm.controls['DepartmentName'].setValue(this.selectedItem.Department);
                this.departmentForm.controls['DepartmentID'].setValue(this.selectedItem.DepartmentID);
            } else if (this.selectedItem.Position) {
                this.departmentForm.controls['DepartmentName'].setValue(this.selectedItem.Position);
                this.departmentForm.controls['DepartmentID'].setValue(this.selectedItem.PositionID);
            }
        }
    }

    ngAfterViewInit(): void {
        this.listDropDownButton = Array.from(document.getElementsByClassName('k-input-button'));
        this.listDropDownButton.forEach((button: any) => {
            button.remove();
        });
    }

    handeCloseForm() {
        this.formType = '';
        this.drawerView.toggle();
    }

    onOpen(ev: any) {
        this.isDropDownOpen = true;
    }

    onClose(ev: any) {
        this.isDropDownOpen = false;
    }
}
