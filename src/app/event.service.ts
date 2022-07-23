import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CalendarEvent } from 'src/model/calendar-event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private url = 'http://localhost:5212/CalendarEvent'
  private latestEvents = new BehaviorSubject<CalendarEvent[]>([]);

  constructor(private http: HttpClient) { }

  public getEvents(date: Date): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(this.url, {
      params: {
        filter: `StartDate gt ${this.getStartDate(date).toJSON()} and EndDate lt ${this.getEndDate(date).toJSON()}`
      }
    }).pipe(tap(res => {
      this.latestEvents.next(res)
    }));
  }

  public getLatestEvents() {
    return this.latestEvents.asObservable();
  }

  public createEvent(event: CalendarEvent) {
    return this.http.post(this.url, event);
  }

  public updateEvent(event: CalendarEvent) {
    return this.http.put(this.url, event);
  }

  private getStartDate(date: Date) {
    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0);
    return startDate;
  }

  private getEndDate(date: Date) {
    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999);
    return endDate;
  }

}
