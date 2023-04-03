import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Renderer2,
    Self,
    ViewChild,
} from '@angular/core';
import { MatCalendar, MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as $ from 'jquery';
import {
    ControlContainer,
    ControlValueAccessor,
    FormControl,
    FormControlName,
    FormGroupDirective,
    NgControl,
} from '@angular/forms';

export const NOOP_VALUE_ACCESSOR: ControlValueAccessor = {
    writeValue(): void {},
    registerOnChange(): void {},
    registerOnTouched(): void {},
};

@Component({
    selector: 'app-customized-calender',
    templateUrl: './customized-calender.component.html',
    styleUrls: ['./customized-calender.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [
        {
            provide: ControlContainer,
            useExisting: FormGroupDirective,
        },
    ],
})
export class CustomizedCalenderComponent implements OnInit {
    exampleHeader = ExampleHeader;
    isPopupOpen = new BehaviorSubject<boolean>(false);
    isOpen = false;
    date = new FormControl(new Date());
    @ViewChild('picker')
    picker!: MatDatepicker<Date>;
    @Input() dateControl = new FormControl();
    constructor(private renderer: Renderer2, private el: ElementRef, @Self() @Optional() public ngControl: NgControl) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = NOOP_VALUE_ACCESSOR;
        }
    }

    ngOnInit(): void {}

    ngAfterViewInit() {
        $('#icon-calendar .mdc-icon-button .mat-datepicker-toggle-default-icon').remove();
        // $('#icon-calendar .mdc-icon-button').off();
        // const mdcIconButton = this.el.nativeElement.querySelector('#icon-calendar .mdc-icon-button');
        // this.renderer.listen(mdcIconButton, 'click', this.handleOpenCalendarPopup.bind(this));
        // this inside the handleOpenCalendarPopup() method is undefined. This can happen if the method is not bound to the correct this context.
        //This will ensure that this inside the method refers to the component instance and not undefined.
        // // create defaultCalendar button
        // const calendarPopup = this.el.nativeElement.querySelector('.cdk-overlay-container');
        // const defaultCalendar = this.renderer.createElement('img');
        // this.renderer.setAttribute(defaultCalendar, 'src', '/assets/icon/defaultCalendar.svg');
        // this.renderer.addClass(defaultCalendar, 'default-calendar');
        // this.renderer.setStyle(defaultCalendar, 'display', this.isPopupOpen.value ? 'none' : 'block');
        // this.renderer.appendChild(
        //     this.el.nativeElement.querySelector('#icon-calendar .mdc-icon-button'),
        //     defaultCalendar,
        // );
        // this.renderer.listen(defaultCalendar, 'click', () => {
        //     this.renderer.setStyle(calendarPopup, 'display', 'block');
        //     console.log('opened');
        // });
        // // create activeCalendar button
        // const activeCalendar = this.renderer.createElement('img');
        // this.renderer.setAttribute(activeCalendar, 'src', '/assets/icon/activeCalendar.svg');
        // this.renderer.addClass(activeCalendar, 'active-calendar');
        // this.renderer.setStyle(activeCalendar, 'display', this.isPopupOpen.value ? 'block' : 'none');
        // this.renderer.appendChild(
        //     this.el.nativeElement.querySelector('#icon-calendar .mdc-icon-button'),
        //     activeCalendar,
        // );
        // this.renderer.listen(activeCalendar, 'click', () => {
        //     this.renderer.setStyle(calendarPopup, 'display', 'none');
        //     console.log('closed');
        // });
        // // active button calendar icon
        // this.isPopupOpen?.subscribe((isOpen) => {
        //     this.renderer.setStyle(defaultCalendar, 'display', isOpen ? 'none' : 'block');
        //     this.renderer.setStyle(activeCalendar, 'display', isOpen ? 'block' : 'none');
        // });
    }

    handleOpenCalendarPopup() {
        console.log('click btn');
        this.isPopupOpen.next(!this.isPopupOpen.value);
    }

    handleOpen() {
        this.isOpen = true;
        console.log('open');
    }

    handleClose() {
        this.isOpen = false;
        console.log('close');
    }
}

/** Custom header component for datepicker. */
@Component({
    selector: 'example-header',
    styles: [
        `
            .example-header {
                display: flex;
                align-items: center;
                padding: 0.5em;
                justify-content: space-between;
            }

            .example-header-label {
                flex: 1;
                font-weight: 500;
                text-align: left;
                margin-left: 22px;
                color: #5a6276;
                font-size: 13px;
                font-weight: 600;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            .next-prev-btn {
                border-radius: 100%;
                text-align: center;
                height: 35px;
                width: 35px;
            }

            .next-prev-btn:hover {
                background-color: #f5f6f8;
            }

            .example-double-arrow .mat-icon {
                margin: -22%;
            }
        `,
    ],
    template: `
        <div class="example-header">
            <span class="example-header-label">{{ periodLabel }}</span>

            <div class="controll-btns">
                <button class="next-prev-btn" mat-icon-button (click)="previousClicked('month')">
                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.797907 6.18796C0.76322 6.23327 0.732443 6.28144 0.705907 6.33196C0.662464 6.38706 0.624611 6.44635 0.592907 6.50896C0.57226 6.57405 0.55819 6.64105 0.550907 6.70896C0.508422 6.83719 0.508422 6.97572 0.550907 7.10396C0.55819 7.17186 0.57226 7.23886 0.592907 7.30396C0.624668 7.36621 0.66252 7.42517 0.705907 7.47996C0.732244 7.53185 0.763026 7.58137 0.797907 7.62796L6.43891 12.911C6.64553 13.0912 6.91406 13.1841 7.18789 13.1703C7.46172 13.1564 7.71947 13.0368 7.90682 12.8366C8.09417 12.6364 8.19649 12.3713 8.19222 12.0971C8.18794 11.823 8.07741 11.5612 7.88391 11.367L3.06791 6.84696L7.88391 2.32696C8.07741 2.13271 8.18794 1.87092 8.19222 1.59678C8.19649 1.32263 8.09417 1.05753 7.90682 0.857339C7.71947 0.657151 7.46172 0.537514 7.18789 0.523638C6.91406 0.509762 6.64553 0.602733 6.43891 0.782956L0.797907 6.18796Z"
                            fill="#959DB3"
                        />
                    </svg>
                </button>
                <button class="next-prev-btn" mat-icon-button (click)="nextClicked('month')">
                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.83783 7.50601C7.87252 7.4607 7.9033 7.41253 7.92983 7.36201C7.97328 7.30691 8.01113 7.24762 8.04283 7.18501C8.06348 7.11992 8.07755 7.05292 8.08483 6.98501C8.12732 6.85677 8.12732 6.71825 8.08483 6.59001C8.07755 6.52211 8.06348 6.45511 8.04283 6.39001C8.01107 6.32776 7.97322 6.2688 7.92983 6.21401C7.9035 6.16212 7.87272 6.1126 7.83783 6.06601L2.19684 0.783014C1.99021 0.60279 1.72168 0.50982 1.44785 0.523696C1.17402 0.537571 0.916274 0.657209 0.728922 0.857396C0.541571 1.05758 0.439251 1.32269 0.443525 1.59683C0.4478 1.87098 0.558334 2.13276 0.751835 2.32701L5.56783 6.84701L0.751835 11.367C0.558334 11.5613 0.4478 11.823 0.443525 12.0972C0.439251 12.3713 0.541571 12.6364 0.728922 12.8366C0.916274 13.0368 1.17402 13.1565 1.44785 13.1703C1.72168 13.1842 1.99021 13.0912 2.19684 12.911L7.83783 7.50601Z"
                            fill="#959DB3"
                        />
                    </svg>
                </button>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleHeader<D> implements OnDestroy {
    private _destroyed = new Subject<void>();

    constructor(
        private _calendar: MatCalendar<D>,
        private _dateAdapter: DateAdapter<D>,
        @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
        cdr: ChangeDetectorRef,
    ) {
        _calendar.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => cdr.markForCheck());
    }

    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
    monthNames = ['một', 'hai', 'ba', 'tư', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười', 'mười một', 'mười hai'];

    get periodLabel() {
        let labelHeader = 'Tháng ';
        const monthIdx = this._dateAdapter.getMonth(this._calendar.activeDate);
        labelHeader += this.monthNames[monthIdx] + ', ';
        const year = this._dateAdapter.getYear(this._calendar.activeDate).toString();
        labelHeader += year;
        return labelHeader;
    }

    previousClicked(mode: 'month' | 'year') {
        this._calendar.activeDate =
            mode === 'month'
                ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
                : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
    }

    nextClicked(mode: 'month' | 'year') {
        this._calendar.activeDate =
            mode === 'month'
                ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
                : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
    }
}
