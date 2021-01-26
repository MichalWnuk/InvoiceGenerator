import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Row } from '../row.model';
import { Timesheet } from '../timesheet.model';
import { TimesheetService } from '../timesheet.service';

@Component({
  selector: 'app-timesheet-add',
  templateUrl: './timesheet-add.component.html',
  styleUrls: ['./timesheet-add.component.css']
})
export class TimesheetAddComponent implements OnInit {
  @Output() closeEvent = new EventEmitter();
  @ViewChild('timesheetForm', { static: false }) timesheetForm: NgForm;

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.timesheetForm.value.month);
    const timesheet: Timesheet = new Timesheet();
    const timesheetDate: Date = new Date(this.timesheetForm.value.month);
    timesheet.date = timesheetDate;
    timesheet.state = 'Open';
    timesheet.rows = [];
    timesheet.id = Math.floor(Math.random() * 1000); // to be replaced by real ID from DB
    this.timesheetService.addTimesheet(timesheet);
    this.timesheetForm.reset();
    this.closeEvent.emit();
  }

  onCancel(): void {
    this.closeEvent.emit();
  }
}
