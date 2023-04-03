import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CalendarService } from 'src/app/ProductManagement/services/calendar.service';
export const MY_FORMATS = {
    parse: {
        dateInput: 'DD',
    },
    display: {
        dateInput: 'DD',
        monthYearLabel: 'MMM, YYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-customized-header',
    templateUrl: './customized-header.component.html',
    styleUrls: ['./customized-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizedHeaderComponent implements OnInit {
    exampleHeader = ExampleHeader;
    date: Date = new Date();
    realDateStr = '';

    @Input() typeDate?: string;
    @Output() getTestDate = new EventEmitter();
    constructor(private calendarServicer: CalendarService) {}

    ngOnInit(): void {}

    getChangedValue(e: any) {
        if (this.typeDate == 'start') {
            this.date = e;
            this.realDateStr = '';
            let dateStr = e._i.date.toString();
            let monthStr = '';
            if (e._i.month + 1 < 10) {
                monthStr += `0${(e._i.month + 1).toString()}`;
            } else {
                monthStr += (e._i.month + 1).toString();
            }
            let yearStr = e._i.year.toString();
            this.realDateStr += `${dateStr}/${monthStr}/${yearStr}`;
            this.calendarServicer.setStartDateFromCalendar(this.realDateStr);
            this.getTestDate.emit(e._i);
        } else if (this.typeDate == 'end') {
            this.date = e;
            this.realDateStr = '';
            let dateStr = e._i.date.toString();
            let monthStr = '';
            if (e._i.month + 1 < 10) {
                monthStr += `0${(e._i.month + 1).toString()}`;
            } else {
                monthStr += (e._i.month + 1).toString();
            }
            let yearStr = e._i.year.toString();
            this.realDateStr += `${dateStr}/${monthStr}/${yearStr}`;
            this.calendarServicer.setEndDateFromCalendar(this.realDateStr);
            this.getTestDate.emit(e._i);
            console.log('date', this.date);
        }
    }
}

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
export class ExampleHeader<D extends Date> implements OnDestroy {
    private _destroyed = new Subject<void>();

    monthNames = ['một', 'hai', 'ba', 'tư', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười', 'mười một', 'mười hai'];

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

    // get header label of calendar by customizing
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
        console.log(this._calendar.activeDate);
    }

    nextClicked(mode: 'month' | 'year') {
        this._calendar.activeDate =
            mode === 'month'
                ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
                : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
    }
}
