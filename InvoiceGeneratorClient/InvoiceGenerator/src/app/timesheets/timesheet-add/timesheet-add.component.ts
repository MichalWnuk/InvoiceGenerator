import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-timesheet-add',
  templateUrl: './timesheet-add.component.html',
  styleUrls: ['./timesheet-add.component.css']
})
export class TimesheetAddComponent implements OnInit {
  @Output() closeEvent = new EventEmitter();
  @ViewChild('timesheetForm', { static: false }) timesheetForm: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.timesheetForm.value.month);
    this.timesheetForm.reset();
    this.closeEvent.emit();
  }

  onCancel(): void {
    this.closeEvent.emit();
  }
}
