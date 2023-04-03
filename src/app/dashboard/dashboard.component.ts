import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Link } from '../link';
import { ListlinkService } from 'src/services/listlink.service';
import { LinkactionComponent } from '../components/linkaction/linkaction.component';
import { FormService } from '../form-service.service';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    @ViewChild(LinkactionComponent) child!: LinkactionComponent;
    isShowAddForm: boolean = false;
    isSearchValue: boolean = false;
    isPost: boolean = true;
    isProduct: boolean = true;
    constructor(private listLink: ListlinkService, private formSerivce: FormService) {}

    ngOnInit(): void {}

    onCloseForm() {
        this.isShowAddForm = false;
    }

    onCheckSearchValue(input: string) {
        if (input) {
            this.isSearchValue = true;
        } else if (input.length == 0 || input == '') {
            this.isSearchValue = false;
        }
    }

    handleResetType = () => {
        this.isPost = true;
        this.isProduct = true;
        this.child.updateCheckBox();
    };

    get isOpenForm(): boolean {
        return this.formSerivce.isOpenForm;
    }

    get isEditItem(): Link {
        return this.formSerivce.isEditItem;
    }
}
