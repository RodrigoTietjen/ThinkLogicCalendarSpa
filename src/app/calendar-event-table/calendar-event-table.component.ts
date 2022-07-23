import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'src/model/calendar-event.model';
import { CalendarFormService } from '../calendar-form.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-calendar-event-table',
  templateUrl: './calendar-event-table.component.html',
  styleUrls: ['./calendar-event-table.component.sass'],
})
export class CalendarEventTableComponent implements OnInit {
  public displayedColumns = [
    'title',
    'description',
    'location',
    'startDate',
    'endDate',
    'action'
  ];
  public dataSource = new MatTableDataSource();

  constructor(private eventService: EventService, private formService: CalendarFormService) {}

  ngOnInit(): void {
    this.eventService.getLatestEvents().subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  updateEvent(event: CalendarEvent) {
    this.formService.setCurrentCalendarEvent(event);
  }
}
