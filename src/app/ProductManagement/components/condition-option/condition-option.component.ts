import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-condition-option',
    templateUrl: './condition-option.component.html',
    styleUrls: ['./condition-option.component.scss'],
})
export class ConditionOptionComponent {
    hachiStore = [
        {
            id: 1,
            storeName: 'CH Hachi Hachi Pastuer',
        },
        {
            id: 2,
            storeName: 'CH Hachi Hachi NVT',
        },
        {
            id: 3,
            storeName: 'CH Hachi Hachi CMT8',
        },
        {
            id: 4,
            storeName: 'CH Hachi Hachi PMH',
        },
        {
            id: 5,
            storeName: 'CH Hachi Hachi Pastuer2',
        },
        {
            id: 6,
            storeName: 'CH Hachi Hachi Pastuer3',
        },
        {
            id: 7,
            storeName: 'CH Hachi Hachi Pastuer4',
        },
    ];

    public usageCondition: FormGroup = new FormGroup({
        usageQuatity: new FormControl('5,000'),
        maxUsage: new FormControl('1'),
        minValue: new FormControl('0'),
        maxDiscount: new FormControl('100,000'),
    });

    public isCheckAll = true;
    public isHachiWeb = true;
    public selectedList: any[] = this.hachiStore.map((item) => item.id);
    public isIndividual = false;

    handleChecked = (id: number) => {
        console.log(this.selectedList);

        if (!this.selectedList.includes(id)) {
            this.selectedList.push(id);
            if (this.selectedList.length == this.hachiStore.length) {
                this.isCheckAll = true;
                console.log(this.isCheckAll);
            } else {
                this.isCheckAll = false;
            }
        } else if (this.selectedList.includes(id)) {
            this.selectedList = this.selectedList.filter((item) => item !== id);
            this.isCheckAll = false;
            console.log('deleted');
        }
        console.log(this.selectedList);
    };

    handleIsCheckAll() {
        this.isCheckAll = !this.isCheckAll;
        if (this.isCheckAll == true) {
            this.hachiStore.map((item) => this.selectedList.push(item.id));
        } else {
            this.selectedList = [];
        }
    }

    handleSetIndividual(value: boolean) {
        this.isIndividual = value;
    }
}
