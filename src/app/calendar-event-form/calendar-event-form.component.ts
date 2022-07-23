import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CalendarEvent } from 'src/model/calendar-event.model';
import { CalendarFormService } from '../calendar-form.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-calendar-event-form',
  templateUrl: './calendar-event-form.component.html',
  styleUrls: ['./calendar-event-form.component.sass']
})
export class CalendarEventFormComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private calendarFormService: CalendarFormService,
    private eventService: EventService
  ) {
    this.buildForm({});

    this.calendarFormService.currentCalendarEvent$().subscribe(res => {
      this.buildForm(res);
    })
  }

  ngOnInit(): void {

  }

  public buildForm(calendarEvent: CalendarEvent) {
    this.formGroup = this.fb.group({
      id: this.fb.control(calendarEvent.id || null),
      startDate: this.fb.control(calendarEvent.startDate || new Date()),
      endDate: this.fb.control(calendarEvent.endDate || new Date()),
      title: this.fb.control(calendarEvent.title || ''),
      description: this.fb.control(calendarEvent.description || ''),
      location: this.fb.control(calendarEvent.location || ''),
    });
    this.formGroup.get('startDate')?.disable();
    this.formGroup.get('endDate')?.disable();
  }

  public createEvent() {
    if(!this.formGroup.get('id')?.value) {
      this.eventService.createEvent(this.formGroup.getRawValue()).subscribe(() => {
        this.eventService.getEvents(this.formGroup.get('startDate')?.value).subscribe()
        this.buildForm({});
      });
    } else {
      this.eventService.updateEvent(this.formGroup.getRawValue()).subscribe(() => {
        this.eventService.getEvents(this.formGroup.get('startDate')?.value).subscribe()
        this.buildForm({});
      });
    }
  }

}
