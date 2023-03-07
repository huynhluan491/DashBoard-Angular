import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-linkaction',
    templateUrl: './linkaction.component.html',
    styleUrls: ['./linkaction.component.scss'],
})
export class LinkactionComponent {
    @Input() isShowProduct: boolean = true;
    @Input() isShowPost: boolean = true;

    @Output() onFilter: EventEmitter<{ post: boolean; product: boolean }> = new EventEmitter<{
        post: boolean;
        product: boolean;
    }>();

    handleShowPost(value: boolean) {
        this.isShowPost = value;
        this.onFilter.emit({ post: this.isShowPost, product: this.isShowProduct });
    }

    handleShowProduct(value: boolean) {
        this.isShowProduct = value;
        this.onFilter.emit({ post: this.isShowPost, product: this.isShowProduct });
    }
}
