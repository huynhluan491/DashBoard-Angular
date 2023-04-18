import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-send-notification',
    templateUrl: './send-notification.component.html',
    styleUrls: ['./send-notification.component.scss'],
})
export class SendNotificationComponent {
    public smsSetup: FormGroup = new FormGroup({
        title: new FormControl('Hachi Hachi chúc mừng bạn nhận được Coupon mã [COUPONID]'),
        notiContent: new FormControl(
            'The channel does not make money from advertising, no popular music, no hustle and bustle, all videos on the channel are for entertainment purposes only to serve quality listeners."All issues related to copyright please contact me"',
        ),
        sendDate: new FormControl(new Date(2023, 4, 10, 0, 50)),
    });

    public mobileSetup: FormGroup = new FormGroup({
        title: new FormControl('Hachi Hachi chúc mừng bạn nhận được Coupon mã [COUPONID]'),
        notiContent: new FormControl(
            'The channel does not make money from advertising, no popular music, no hustle and bustle, all videos on the channel are for entertainment purposes only to serve quality listeners."All issues related to copyright please contact me"',
        ),
    });

    public cartSetup: FormGroup = new FormGroup({
        title: new FormControl('Hachi Hachi chúc mừng bạn nhận được Coupon mã [COUPONID]'),
        notiContent: new FormControl(
            'The channel does not make money from advertising, no popular music, no hustle and bustle, all videos on the channel are for entertainment purposes only to serve quality listeners."All issues related to copyright please contact me"',
        ),
    });

    public isSMS = true;
    public isMobile = false;
    public isCart = false;
    public readOnlyInput = true;

    onSmsMode() {
        this.isSMS = true;
        this.isMobile = false;
        this.isCart = false;
    }

    onMobileMode() {
        this.isSMS = false;
        this.isMobile = true;
        this.isCart = false;
    }

    onCartMode() {
        this.isSMS = false;
        this.isMobile = false;
        this.isCart = true;
    }

    setDatePicked(selectedDate: Date) {
        this.smsSetup.controls['sendDate'].setValue(selectedDate);
        console.log(this.smsSetup.controls['sendDate'].value);
    }
}
