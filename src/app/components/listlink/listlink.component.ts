import { Component, OnInit, Input } from '@angular/core';
import { Link } from 'src/app/link';

@Component({
    selector: 'app-listlink',
    templateUrl: './listlink.component.html',
    styleUrls: ['./listlink.component.scss'],
})
export class ListlinkComponent implements OnInit {
    @Input() links: Link[] = [];
    constructor() {}

    ngOnInit(): void {}
}
