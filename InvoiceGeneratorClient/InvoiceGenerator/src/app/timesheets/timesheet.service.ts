import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Day } from './day.model';
import { Row } from './row.model';
import { Timesheet } from './timesheet.model';

@Injectable()
export class TimesheetService {
  timesheetsChanged = new Subject<Timesheet[]>();
  private timesheets: Timesheet[] = [];
  constructor() { }

  setTimesheets(timesheets: Timesheet[]): void {
    this.timesheets = timesheets;
    this.timesheetsChanged.next(this.getTimesheets());
  }

  getTimesheets(): Timesheet[] {
    return this.timesheets.slice().sort((a, b) => b.date.valueOf() - a.date.valueOf());
  }

  getTimesheet(id: number): Timesheet {
    return this.timesheets.find(timesheet => timesheet.id === id);
  }

  addTimesheet(timesheet: Timesheet): void {
    this.timesheets.push(timesheet);
    this.timesheetsChanged.next(this.getTimesheets());
  }

  updateTimesheet(updatedTimesheet: Timesheet): void {
    const index = this.timesheets.findIndex(timesheet => timesheet.id === updatedTimesheet.id);
    this.timesheets[index] = updatedTimesheet;
    this.timesheetsChanged.next(this.getTimesheets());
  }

  parseResponseTimesheetsToTimesheetsCollection(timesheets: Timesheet[]): Timesheet[] {
    const output: Timesheet[] = [];
    timesheets.forEach(timesheet => {
      output.push(this.parseResponseTimesheetToTimesheetObject(timesheet));
    });

    return output;
  }

  parseResponseTimesheetToTimesheetObject(timesheet: Timesheet): Timesheet {
    const timesheetRows: Row[] = [];
    timesheet.rows.forEach(row => {
      timesheetRows.push(this.parseResponseRowToRowObject(row));
    });

    const output: Timesheet = {
      id: +timesheet.id,
      date: new Date(timesheet.date),
      state: timesheet.state,
      userId: timesheet.userId,
      rows: timesheetRows
    };

    return output;
  }

  private parseResponseRowToRowObject(row: Row): Row {
    const rowDays: Day[] = [];
    row.days.forEach(day => {
      rowDays.push(this.parseResponseDayToDayObject(day));
    });

    const output: Row = {
      id: +row.id,
      rateTypeId: row.rateTypeId,
      days: rowDays,
      timesheetId: row.timesheetId
    };

    return output;
  }

  private parseResponseDayToDayObject(day: Day): Day {
    const output: Day = {
      date: new Date(day.date),
      reportedHours: +day.reportedHours
    };

    return output;
  }
}
