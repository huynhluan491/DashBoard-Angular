import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-department-position-add-button',
    templateUrl: './department-position-add-button.component.html',
    styleUrls: ['./department-position-add-button.component.scss'],
})
export class DepartmentPositionAddButtonComponent {
    @Input() addTypeName: string = '';
    @Input() iconUrl: string = '';
}
