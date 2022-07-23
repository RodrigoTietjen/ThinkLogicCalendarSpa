import { WeekDay } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarFormService } from '../calendar-form.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
})
export class CalendarComponent implements OnInit {
  public weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  public weeks: string[][] = [];

  public currentDate: Date = new Date();

  constructor(
    private eventService: EventService,
    private calendarFormService: CalendarFormService
  ) {}

  ngOnInit(): void {
    this.updateCalendar(this.currentDate.getFullYear(), this.currentDate.getMonth());
    this.eventService.getEvents(this.currentDate).subscribe();
  }

  updateCalendar(year: number, month: number) {
    this.weeks = [];
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();

    let currentDay = 1;

    for (var i = 0; i <= 5; i++) {
      this.weeks.push([]);
      for (let j = 0; j < this.weekDays.length; j++) {
        if (i === 0 && j < firstDay) {
          this.weeks[i].push('');
        } else if (currentDay > daysInMonth) {
          break;
        } else {
          this.weeks[i].push(currentDay.toString());
          currentDay++;
        }
      }
    }
  }

  updateCurrentDate(year: number, month: number, date: number) {
    if(!date) return;
    this.currentDate = new Date(year, month, date);
    this.calendarFormService.setCurrentCalendarEvent({startDate: this.currentDate, endDate: this.currentDate});
    this.eventService.getEvents(this.currentDate).subscribe();
  }

  getClass(day: string): string {
    var toReturn = '';

    if(day) toReturn = toReturn.concat('click-option') 
    if(this.currentDate.getDate() == +day) toReturn = toReturn.concat(' active')

    return toReturn;
  }
}
