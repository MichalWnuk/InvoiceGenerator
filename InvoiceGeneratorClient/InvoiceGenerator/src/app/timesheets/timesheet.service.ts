import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Timesheet } from './timesheet.model';

@Injectable()
export class TimesheetService {
  timesheetsChanged = new Subject<Timesheet[]>();
  private timesheets: Timesheet[] = [
    {
      id: 1, year: 2020, month: 1, state: 'Open', invoiceNumber: '001', rows: [
        {
          id: 1, rateType: { id: 1, name: 'STD', type: 'STD' }, days: [
            { dayNumber: 1, reportedHours: 8 },
            { dayNumber: 2, reportedHours: 8 },
            { dayNumber: 3, reportedHours: 8 },
            { dayNumber: 4, reportedHours: 8 },
            { dayNumber: 5, reportedHours: 8 },
          ]
        }
      ]
    },
    {
      id: 2, year: 2020, month: 2, state: 'Open', invoiceNumber: '002', rows: [
        {
          id: 2, rateType: { id: 1, name: 'STD', type: 'STD' }, days: [
            { dayNumber: 1, reportedHours: 8 },
            { dayNumber: 2, reportedHours: 8 },
            { dayNumber: 3, reportedHours: 8 },
            { dayNumber: 4, reportedHours: 8 },
            { dayNumber: 5, reportedHours: 8 },
          ]
        }
      ]
    },
    {
      id: 3, year: 2020, month: 3, state: 'Open', invoiceNumber: '003', rows: [
        {
          id: 3, rateType: { id: 1, name: 'STD', type: 'STD' }, days: [
            { dayNumber: 1, reportedHours: 8 },
            { dayNumber: 2, reportedHours: 8 },
            { dayNumber: 3, reportedHours: 8 },
            { dayNumber: 4, reportedHours: 8 },
            { dayNumber: 5, reportedHours: 8 },
          ]
        },
        {
          id: 4, rateType: { id: 1, name: 'STD', type: 'STD' }, days: [
            { dayNumber: 1, reportedHours: 8 },
            { dayNumber: 2, reportedHours: 8 },
            { dayNumber: 3, reportedHours: 8 },
            { dayNumber: 4, reportedHours: 8 },
            { dayNumber: 5, reportedHours: 8 },
          ]
        },
        {
          id: 5, rateType: { id: 1, name: 'STD', type: 'STD' }, days: [
            { dayNumber: 1, reportedHours: 8 },
            { dayNumber: 2, reportedHours: 8 },
            { dayNumber: 3, reportedHours: 8 },
            { dayNumber: 4, reportedHours: 8 },
            { dayNumber: 5, reportedHours: 8 },
          ]
        },
        {
          id: 6, rateType: { id: 1, name: 'STD', type: 'STD' }, days: [
            { dayNumber: 1, reportedHours: 8 },
            { dayNumber: 2, reportedHours: 8 },
            { dayNumber: 3, reportedHours: 8 },
            { dayNumber: 4, reportedHours: 8 },
            { dayNumber: 5, reportedHours: 8 },
          ]
        }
      ]
    }
  ];
  constructor() { }

  setTimesheets(timesheets: Timesheet[]): void {
    this.timesheets = timesheets;
  }

  getTimesheets(): Timesheet[] {
    return this.timesheets.slice();
  }

  getTimesheet(id: number): Timesheet {
    return this.timesheets.find(timesheet => timesheet.id === id);
  }

  addTimesheet(timesheet: Timesheet): void {
    this.timesheets.push(timesheet);
    this.timesheetsChanged.next(this.getTimesheets());
  }

  updateTimesheet(id: number, updatedTimesheet: Timesheet): void {
    const index = this.timesheets.findIndex(timesheet => timesheet.id === id);
    this.timesheets[index] = updatedTimesheet;
    this.timesheetsChanged.next(this.getTimesheets());
  }
}
