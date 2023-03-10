import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-linkaction',
    templateUrl: './linkaction.component.html',
    styleUrls: ['./linkaction.component.scss'],
})
export class LinkactionComponent {
    @Input() isShowProduct: boolean = true;
    @Input() isShowPost: boolean = true;
    @Input() isShowAddForm!: boolean;
    @Input() onAddLink!: (link: object) => void;
    @Output() onFilter: EventEmitter<{ post: boolean; product: boolean }> = new EventEmitter<{
        post: boolean;
        product: boolean;
    }>();

    @Output() onShowAddForm: EventEmitter<void> = new EventEmitter<void>();
    @Output() onCloseForm: EventEmitter<void> = new EventEmitter<void>();

    handleShowPost(value: boolean) {
        this.isShowPost = value;
        this.onFilter.emit({ post: this.isShowPost, product: this.isShowProduct });
    }

    handleShowProduct(value: boolean) {
        this.isShowProduct = value;
        this.onFilter.emit({ post: this.isShowPost, product: this.isShowProduct });
    }

    handleCloseForm() {
        this.onCloseForm.emit();
    }

    onAddLinkHandler = (newLink: any) => {
        if (this.onAddLink) {
            this.onAddLink(newLink);
        }
    };
}
