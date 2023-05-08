import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-department-form',
    templateUrl: './department-form.component.html',
    styleUrls: ['./department-form.component.scss'],
})
export class DepartmentFormComponent {
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
    });
}
