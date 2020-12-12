import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Timesheet } from '../timesheet.model';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.css']
})
export class TimesheetListComponent implements OnInit {
  timesheets: Timesheet[];
  headers: string[];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.headers = [
      "Year",
      "Month",
      "Total Hours",
      "State",
      "Invoice No."
    ];

    this.timesheets = [
      {
        id: 1, year: 2020, month: 1, state: "Open", invoiceNumber: "001", rows: [
          {
            id: 1, rateType: { id: 1, name: "STD", type: "STD" }, days: [
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
        id: 2, year: 2020, month: 2, state: "Open", invoiceNumber: "001", rows: [
          {
            id: 2, rateType: { id: 1, name: "STD", type: "STD" }, days: [
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
        id: 3, year: 2020, month: 3, state: "Open", invoiceNumber: "001", rows: [
          {
            id: 3, rateType: { id: 1, name: "STD", type: "STD" }, days: [
              { dayNumber: 1, reportedHours: 8 },
              { dayNumber: 2, reportedHours: 8 },
              { dayNumber: 3, reportedHours: 8 },
              { dayNumber: 4, reportedHours: 8 },
              { dayNumber: 5, reportedHours: 8 },
            ]
          }
        ]
      }
    ]
  }

  getTotalHours(timesheet: Timesheet): string {
    const rows = timesheet.rows;

    let hoursCount: number = 0;

    rows.forEach(row => {
      row.days.forEach(day => {
        hoursCount += day.reportedHours;
      });
    });

    return hoursCount.toString();
  }

  onNewTimesheet() {
    this.router.navigate(['./new'], { relativeTo: this.route })
  }

}
