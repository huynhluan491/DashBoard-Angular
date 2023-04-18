import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Provider,
    SimpleChanges,
    ComponentFactoryResolver,
    ViewChild,
    ViewContainerRef,
    ComponentRef,
} from '@angular/core';
import { MatCalendar, MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import * as $ from 'jquery';
import { ControlContainer, FormControl, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayOutsideClickDispatcher } from '@angular/cdk/overlay';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
// const provider: Provider = {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => CustomizedCalenderComponent),
//     multi: true,
// };

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
    // providers: [provider],
})
export class CustomizedCalenderComponent implements OnInit, OnChanges, AfterViewInit {
    @ViewChild(MatDatepicker) datePicker: any;
    @ViewChild('container', { read: ViewContainerRef, static: false }) container!: ViewContainerRef;
    exampleHeader = ExampleHeader;
    isOpen = false;
    picker!: MatDatepicker<Date>;
    selectedItem = '';
    calendar: any;
    isTimeOpen: boolean = false;

    //DATETIMEPICKER APPEND
    timePickWrapper: any;
    alldayWrap: any;
    selectionWrapper: any;
    selectElement: any;

    //reset closing popup matcalendar
    private selfClose?: () => void;

    @Input() isDateTimePicker?: boolean = false;
    @Input() dateValue = new FormControl();
    @Output() onDatePicked = new EventEmitter<Date>();

    dateValueStr: string = '';
    timeValueStr: string = '';
    timePickerValue: any[] = [12, 0];
    selectedDate: string = 'vcc';
    public selectedHours: number = 12;
    public selectedMinutes: number = 0;
    isPM = new BehaviorSubject<boolean>(false);

    isTimeSelected: boolean = false;

    public listItems: Array<string> = [
        'Baseball',
        'Basketball',
        'Cricket',
        'Field Hockey',
        'Football',
        'Table Tennis',
        'Tennis',
        'Volleyball',
    ];

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private cdkConnectedOverlay: OverlayOutsideClickDispatcher,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {}

    ngOnInit(): void {
        if (this.isDateTimePicker == true) {
            this.convertDateToString();
            this.convertTimeToString();
        } else if (this.isDateTimePicker == false) {
            this.convertDateToString();
        }

        this.isPM.pipe(skip(1)).subscribe((value) => {
            console.log(value);
            console.log(this.selectedHours);
            this.selectedHours = this.timePickerValue[0];
            this.selectedMinutes = this.timePickerValue[1];
            this.setTimeOfDate();
            this.onDatePicked.emit(this.dateValue.value);
            this.convertTimeToString();
        });
    }

    ngOnChanges(changes: SimpleChanges) {}

    ngAfterViewInit() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(DropDownListComponent);
        const componentRef = factory.create(this.container.injector) as ComponentRef<DropDownListComponent>;
        componentRef.instance.data = this.cbValue;

        // handle the 'close' event of the Kendo dropdown list component
        componentRef.instance.close.subscribe((e: any) => {
            e.preventDefault(); // prevent the dropdown list from closing
        });
        // handle the 'mousedown' event on the dropdown list items
        componentRef.location.nativeElement.querySelectorAll('.k-item').forEach((item: any) => {
            item.addEventListener('mousedown', (e: any) => {
                e.stopPropagation(); // prevent the event from propagating to the datepicker element
            });
        });

        $('#icon-calendar .mdc-icon-button .mat-datepicker-toggle-default-icon').remove();
        this.timePickWrapper = document.createElement('div');
        this.timePickWrapper.classList.add('time-picker-wrapper');
        this.timePickWrapper.appendChild(componentRef.location.nativeElement);
        this.selectionWrapper = document.createElement('div');
        this.selectionWrapper.classList.add('selection-wrapper');

        //all-day checkbox
        this.alldayWrap = document.createElement('div');
        this.alldayWrap.classList.add('allday-type');
        const alldayCheck = document.createElement('input');
        alldayCheck.setAttribute('type', 'radio');
        alldayCheck.classList.add('allday-radio');

        //label
        const alldayLabel = document.createElement('label');
        alldayCheck.classList.add('allday-label');
        alldayLabel.innerText = 'Cả ngày';

        this.alldayWrap.appendChild(alldayCheck);
        this.alldayWrap.appendChild(alldayLabel);

        //time selection
        this.selectElement = document.createElement('select');
        this.selectElement.setAttribute('placeholder', 'Select time');
        // this.selectElement.setAttribute('onfocus', 'this.size=24;');
        // this.selectElement.setAttribute('onblur', 'this.size=0;');
        // this.selectElement.setAttribute('onchange', 'this.size=1;this.blur();');
        this.selectElement.classList.add('time-selection');
        this.cbValue.forEach((time) => {
            const optionElement = document.createElement('option');
            optionElement.setAttribute('value', time);
            optionElement.textContent = time;
            this.selectElement.appendChild(optionElement);
        });
        this.selectElement.addEventListener('change', this.handleGetTimeSelection.bind(this)); // assign scope to access variable .bind(this)
        this.selectionWrapper.appendChild(this.selectElement);

        //AM
        const timeTypeWrapper = document.createElement('div');
        timeTypeWrapper.classList.add('time-type-wrapper');
        const amCheck = document.createElement('button');
        amCheck.classList.add('type-selection');
        amCheck.classList.add('active');
        amCheck.innerText = 'AM';
        amCheck.addEventListener('click', () => {
            this.handleSetAM();
            amCheck.classList.add('active');
            pmCheck.classList.remove('active');
        });
        //PM
        const pmCheck = document.createElement('button');
        pmCheck.classList.add('type-selection');
        pmCheck.innerText = 'PM';
        pmCheck.addEventListener('click', () => {
            amCheck.classList.remove('active');
            pmCheck.classList.add('active');
            this.handleSetPM();
        });

        timeTypeWrapper.appendChild(amCheck);
        timeTypeWrapper.appendChild(pmCheck);
        this.selectionWrapper.appendChild(timeTypeWrapper);

        this.timePickWrapper.appendChild(this.alldayWrap);
        this.timePickWrapper.appendChild(this.selectionWrapper);
    }

    cbValue = [
        '12:00',
        '12:30',
        '01:00',
        '01:30',
        '02:00',
        '02:30',
        '03:00',
        '03:30',
        '04:00',
        '04:30',
        '05:00',
        '05:30',
        '06:00',
        '06:30',
        '07:00',
        '07:30',
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
    ];

    handleOnChange(event: any) {
        this.onDatePicked.emit(event.value._d);
        this.dateValueStr = '';
        this.convertDateToString();
        console.log(this.dateValueStr);
    }

    closed() {
        this.isTimeOpen = false;
        this.isOpen = false;
    }

    public onOpen() {
        this.isOpen = true;
        if (this.isDateTimePicker) {
            this.calendar = $('.mat-calendar')[0];
            this.calendar.appendChild(this.timePickWrapper);
        }

        if (this.selfClose === undefined || this.selfClose === null) {
            this.selfClose = this.datePicker.close;
        }
        // rewrite autoclose after date is chosen
        this.datePicker.close = () => {};

        this.cdkConnectedOverlay._attachedOverlays[0]._outsidePointerEvents.subscribe(() => {
            // restore saved close method
            if (this.isTimeSelected) {
                this.onDatePicked.emit(this.dateValue.value);
                this.isTimeSelected = false;
                this.timeValueStr = '';
                this.convertTimeToString();
            }
            this.datePicker.close = this.selfClose;
            this.selfClose = undefined;
            this.datePicker.close();
        });
    }

    handleGetTimeSelection(event: any) {
        let timeValue = event.target.value;
        this.timePickerValue = timeValue.split(':').map(Number);
        console.log(this.timePickerValue);

        this.selectedHours = this.timePickerValue[0];
        this.selectedMinutes = this.timePickerValue[1];
        console.log(this.selectedDate);

        this.setTimeOfDate();
        this.onDatePicked.emit(this.dateValue.value);
        this.convertTimeToString();
    }

    setTimeOfDate() {
        if (this.selectedHours !== 12 && this.isPM.value) {
            this.selectedHours += 12;
        } else if (this.selectedHours >= 12 && !this.isPM.value) {
            this.selectedHours = 0;
        }

        this.dateValue.value.setHours(this.selectedHours);
        this.dateValue.value.setMinutes(this.selectedMinutes);
    }

    convertDateToString() {
        if (this.dateValue) {
            let date = this.dateValue.value.getDate().toString();
            let month = (this.dateValue.value.getMonth() + 1).toString();
            let year = this.dateValue.value.getFullYear().toString();

            if (date * 1 < 10) {
                this.dateValueStr += `0${date}`;
            } else {
                this.dateValueStr += `${date}`;
            }
            if (month * 1 < 10) {
                this.dateValueStr += `/0${month}/${year}`;
            } else {
                this.dateValueStr += `/${month}/${year}`;
            }
        }
    }

    convertTimeToString() {
        this.timeValueStr = '';
        if (this.dateValue) {
            let hours = this.dateValue.value.getHours().toString();
            let minutes = this.dateValue.value.getMinutes().toString();

            if (hours * 1 < 10) {
                this.timeValueStr += ` 0${hours}:`;
            } else {
                this.timeValueStr += ` ${hours}:`;
            }
            if (minutes * 1 < 10) {
                this.timeValueStr += `0${minutes}`;
            } else {
                this.timeValueStr += `${minutes}`;
            }
        }
    }

    handleSetPM() {
        this.isPM.next(true);
    }

    handleSetAM() {
        this.isPM.next(false);
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
