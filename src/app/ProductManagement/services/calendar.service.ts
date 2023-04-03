import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CalendarService {
    startDateStrSelected = '';
    endDateStrSelected = '';
    date: Date = new Date();
    private startDateStrSelected$ = new BehaviorSubject<string>(this.startDateStrSelected);
    private endDateStrSelected$ = new BehaviorSubject<string>(this.endDateStrSelected);
    constructor() {
        let initialDate = this.date.getDate().toString();
        let initialMonth = '';
        if (this.date.getMonth() + 1 < 10) {
            initialMonth += `0${(this.date.getMonth() + 1).toString()}`;
        } else {
            initialMonth += (this.date.getMonth() + 1).toString();
        }
        let initialYear = this.date.getFullYear().toString();
        this.startDateStrSelected += `${initialDate}/${initialMonth}/${initialYear}`;
    }

    getStartDate(): Observable<string> {
        this.startDateStrSelected$.next(this.startDateStrSelected);
        console.log(this.startDateStrSelected$.value);

        return this.startDateStrSelected$.asObservable();
    }

    getEndDate(): Observable<string> {
        this.endDateStrSelected$.next(this.endDateStrSelected);
        console.log(this.endDateStrSelected$.value);

        return this.endDateStrSelected$.asObservable();
    }

    setStartDateFromCalendar(startdateStr: string) {
        this.startDateStrSelected = startdateStr;
        this.getStartDate();
    }

    setEndDateFromCalendar(endDateStr: string) {
        this.endDateStrSelected = endDateStr;
        this.getEndDate();
    }
}
