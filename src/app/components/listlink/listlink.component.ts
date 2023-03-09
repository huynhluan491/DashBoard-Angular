import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Link } from 'src/app/link';

@Component({
    selector: 'app-listlink',
    templateUrl: './listlink.component.html',
    styleUrls: ['./listlink.component.scss'],
})
export class ListlinkComponent implements OnInit {
    isActive: boolean = false;
    activeButton: number = -1;
    isShowEditForm: boolean = false;
    selectedLink!: any;
    selectedListLink: string[] = [];
    selectAllItems: boolean = false;

    @Input() element!: any;
    @Input() link!: object;
    @Input() links: Link[] = [];
    @Input() id!: number;
    @Input() isShowSeeMore?: boolean = false;
    @Output() onShowSeeMore: EventEmitter<void> = new EventEmitter<void>();
    @Output() onDeleteLink: EventEmitter<number> = new EventEmitter<number>();
    constructor() {}

    ngOnInit(): void {}

    setActive(id: number) {
        if (id !== this.activeButton) {
            this.activeButton = id;
            this.isActive = !this.isActive;
            console.log(this.activeButton);
            this.selectedLink = this.links.find((l) => l.id === id);
            console.log(this.selectedLink); // or do whatever you need with the link object
        } else {
            this.activeButton = -1;
        }
    }

    handleDeleteLink = (id: number) => {
        this.onDeleteLink.emit(id);
    };

    handleOpenForm = () => {
        this.isShowEditForm = !this.isShowEditForm;
    };

    handleCloseEditForm = () => {
        this.isShowEditForm = false;
        console.log(this.isShowEditForm);
        this.activeButton = -1;
    };

    handleClick(id: number) {
        const link = this.links.find((l) => l.id === id);
        console.log(link); // or do whatever you need with the link object
    }
}
