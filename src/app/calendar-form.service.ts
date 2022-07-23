import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarEvent } from 'src/model/calendar-event.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarFormService {

  private calendarEventsSubject = new BehaviorSubject<CalendarEvent>({});
  constructor() { }


  public currentCalendarEvent$() {
    return this.calendarEventsSubject.asObservable();
  }

  public setCurrentCalendarEvent(event: CalendarEvent) {
    this.calendarEventsSubject.next(event);
  }

}
