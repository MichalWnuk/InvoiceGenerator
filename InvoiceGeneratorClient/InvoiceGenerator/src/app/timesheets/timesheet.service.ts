import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Timesheet } from './timesheet.model';

@Injectable()
export class TimesheetService {
  timesheetsChanged = new Subject<Timesheet[]>();
  private timesheets: Timesheet[] = [
    {
      id: 1, date: new Date('2020-01'), state: 'Open', invoiceNumber: '001', rows: [
        {
          id: 1, rateType: { id: 1, name: 'STD', type: 'STD' }, days: [
            { date: new Date('2020-01-01'), reportedHours: 8 },
            { date: new Date('2020-01-02'), reportedHours: 8 },
            { date: new Date('2020-01-03'), reportedHours: 8 },
            { date: new Date('2020-01-04'), reportedHours: 8 },
            { date: new Date('2020-01-05'), reportedHours: 8 }
          ]
        }
      ]
    },
    {
      id: 2, date: new Date('2020-02'), state: 'Open', invoiceNumber: '002', rows: [
        {
          id: 2, rateType: { id: 1, name: 'STD', type: 'STD' }, days: [
            { date: new Date('2020-02-01'), reportedHours: 8 },
            { date: new Date('2020-02-02'), reportedHours: 8 },
            { date: new Date('2020-02-03'), reportedHours: 8 },
            { date: new Date('2020-02-04'), reportedHours: 8 },
            { date: new Date('2020-02-05'), reportedHours: 8 }
          ]
        }
      ]
    },
    {
      id: 3, date: new Date('2020-03'), state: 'Open', invoiceNumber: '003', rows: [
        {
          id: 3, rateType: { id: 1, name: 'STD', type: 'STD' }, days: [
            { date: new Date('2020-03-01'), reportedHours: 8 },
            { date: new Date('2020-03-02'), reportedHours: 8 },
            { date: new Date('2020-03-03'), reportedHours: 8 },
            { date: new Date('2020-03-04'), reportedHours: 8 },
            { date: new Date('2020-03-05'), reportedHours: 8 }
          ]
        },
        {
          id: 4, rateType: { id: 1, name: 'STD', type: 'STD' }, days: [
            { date: new Date('2020-03-01'), reportedHours: 8 },
            { date: new Date('2020-03-02'), reportedHours: 8 },
            { date: new Date('2020-03-03'), reportedHours: 8 },
            { date: new Date('2020-03-04'), reportedHours: 8 },
            { date: new Date('2020-03-05'), reportedHours: 8 }
          ]
        },
        {
          id: 5, rateType: { id: 1, name: 'STD', type: 'STD' }, days: [
            { date: new Date('2020-03-01'), reportedHours: 8 },
            { date: new Date('2020-03-02'), reportedHours: 8 },
            { date: new Date('2020-03-03'), reportedHours: 8 },
            { date: new Date('2020-03-04'), reportedHours: 8 },
            { date: new Date('2020-03-05'), reportedHours: 8 }
          ]
        },
        {
          id: 6, rateType: { id: 1, name: 'STD', type: 'STD' }, days: [
            { date: new Date('2020-03-01'), reportedHours: 8 },
            { date: new Date('2020-03-02'), reportedHours: 8 },
            { date: new Date('2020-03-03'), reportedHours: 8 },
            { date: new Date('2020-03-04'), reportedHours: 8 },
            { date: new Date('2020-03-05'), reportedHours: 8 }
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
}
