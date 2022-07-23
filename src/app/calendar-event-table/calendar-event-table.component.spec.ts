import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventTableComponent } from './calendar-event-table.component';

describe('CalendarEventTableComponent', () => {
  let component: CalendarEventTableComponent;
  let fixture: ComponentFixture<CalendarEventTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarEventTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarEventTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
