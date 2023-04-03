import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
    selector: 'app-coupon-form',
    templateUrl: './coupon-form.component.html',
    styleUrls: ['./coupon-form.component.scss'],
})
export class CouponFormComponent implements OnInit {
    public couponForm: FormGroup = new FormGroup({
        couponID: new FormControl('KMGBL22'),
        quantity: new FormControl(10),
        randomCoupon: new FormControl(1),
        couponValue: new FormControl(100000),
        couponName: new FormControl('Giảm 100K '),
        conditionDesc: new FormControl('Áp dụng cho đơn hàng có giá trị trên 600.00 đ'),
        explain: new FormControl('KMGBL22-Voucher lịch 100k HĐ 600k-NGÀY KÍNH LÃO-HSD 30/9/22'),
        endDate: new FormControl(new Date()),
        startDate: new FormControl(new Date()),
    });

    public couponJapaneseForm: FormGroup = new FormGroup({
        couponID: new FormControl(),
        quantity: new FormControl(),
        randomCoupon: new FormControl(),
        couponValue: new FormControl(),
        couponName: new FormControl(),
        conditionDesc: new FormControl(),
        explain: new FormControl(),
        endDate: new FormControl(new Date()),
        startDate: new FormControl(new Date()),
    });

    public couponEnglishForm: FormGroup = new FormGroup({
        couponID: new FormControl(),
        quantity: new FormControl(),
        randomCoupon: new FormControl(),
        couponValue: new FormControl(),
        couponName: new FormControl(),
        conditionDesc: new FormControl(),
        explain: new FormControl(),
        endDate: new FormControl(new Date()),
        startDate: new FormControl(new Date()),
    });

    formLanguages = 'vietnamese';

    constructor() {}

    ngOnInit(): void {}

    onVietnamese() {
        this.formLanguages = 'vietnamese';
    }

    onJapanese() {
        this.formLanguages = 'japanese';
    }

    onEnglish() {
        this.formLanguages = 'english';
    }

    handleLog = () => {
        console.log('startDate', this.couponForm.controls['startDate']);
        console.log('endDate', this.couponForm.controls['endDate']);
    };
}
