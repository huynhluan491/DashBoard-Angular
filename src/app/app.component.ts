import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'angular';

    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon(
            `dfCalendar`,
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/defaultCalendar.svg'),
        );
        this.matIconRegistry.addSvgIcon(
            `activeCalendar`,
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/activeCalendar.svg'),
        );
    }
}
