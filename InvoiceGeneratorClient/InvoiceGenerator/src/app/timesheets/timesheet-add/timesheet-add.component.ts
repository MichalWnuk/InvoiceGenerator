import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Timesheet } from '../timesheet.model';

@Component({
  selector: 'app-timesheet-add',
  templateUrl: './timesheet-add.component.html',
  styleUrls: ['./timesheet-add.component.css']
})
export class TimesheetAddComponent implements OnInit, OnDestroy {
  @Output() closeEvent = new EventEmitter();
  @ViewChild('timesheetForm', { static: false }) timesheetForm: NgForm;
  timesheetSub: Subscription;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.timesheetSub.unsubscribe();
  }

  onSubmit(): void {
    const timesheet: Timesheet = new Timesheet();
    const timesheetDate: Date = new Date(this.timesheetForm.value.month);
    timesheetDate.setDate(2);
    timesheet.date = timesheetDate;
    timesheet.state = 'Open';
    timesheet.rows = [];
    timesheet.userId = '00000000-0000-0000-0000-000000000000';
    this.timesheetSub = this.dataStorageService.createTimesheet(timesheet).subscribe(data => {
      this.timesheetForm.reset();
      this.closeEvent.emit();
    });
  }

  onCancel(): void {
    this.closeEvent.emit();
  }
}
