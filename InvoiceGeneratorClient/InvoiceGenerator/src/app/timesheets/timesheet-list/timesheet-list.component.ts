import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Timesheet } from '../timesheet.model';
import { TimesheetService } from '../timesheet.service';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.css']
})
export class TimesheetListComponent implements OnInit, OnDestroy {
  timesheets: Timesheet[];
  headers: string[];
  isAdding = false;
  timesheetsSubscription: Subscription;

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
    this.headers = [
      'Year',
      'Month',
      'Total Hours',
      'State'
    ];
    this.timesheetsSubscription =
      this.timesheetService.timesheetsChanged.subscribe((timesheets: Timesheet[]) => { this.timesheets = timesheets; });
    this.timesheets = this.timesheetService.getTimesheets();
  }

  ngOnDestroy(): void {
    this.timesheetsSubscription.unsubscribe();
  }

  getTimesheetMonthNumber(date: Date): number {
    return date.getMonth() + 1;
  }

  getTimesheetYear(date: Date): number {
    return date.getUTCFullYear();
  }

  getTotalHours(timesheet: Timesheet): string {
    const rows = timesheet.rows;

    if (!rows) {
      return '0';
    }

    let hoursCount = 0;

    rows.forEach(row => {
      row.days.forEach(day => {
        hoursCount += day.reportedHours;
      });
    });

    return hoursCount.toString();
  }

  onNewTimesheet(): void {
    this.isAdding = true;
  }

  onFinishedAdding(): void {
    this.isAdding = false;
  }
}
