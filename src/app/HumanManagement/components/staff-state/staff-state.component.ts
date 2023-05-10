import { Component, Input } from '@angular/core';
import { StaffStates } from 'src/app/staffStateDemo';

@Component({
    selector: 'app-staff-state',
    templateUrl: './staff-state.component.html',
    styleUrls: ['./staff-state.component.scss'],
})
export class StaffStateComponent {
    staffStates: any[] = StaffStates;
}
