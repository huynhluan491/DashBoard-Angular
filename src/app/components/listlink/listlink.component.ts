import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Link } from 'src/app/link';

@Component({
    selector: 'app-listlink',
    templateUrl: './listlink.component.html',
    styleUrls: ['./listlink.component.scss'],
})
export class ListlinkComponent implements OnInit {
    @Input() links: Link[] = [];
    @Input() isShowSeeMore?: boolean = false;
    @Output() onShowSeeMore: EventEmitter<void> = new EventEmitter<void>();
    constructor() {}

    ngOnInit(): void {}
}
