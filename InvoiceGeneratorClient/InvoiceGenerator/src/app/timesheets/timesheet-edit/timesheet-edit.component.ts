import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Day } from '../day.model';
import { Timesheet } from '../timesheet.model';
import { TimesheetService } from '../timesheet.service';

@Component({
  selector: 'app-timesheet-edit',
  templateUrl: './timesheet-edit.component.html',
  styleUrls: ['./timesheet-edit.component.css']
})
export class TimesheetEditComponent implements OnInit {
  id: number = -1;
  activeTimesheet: Timesheet;
  daysInMonth: Day[] = [];
  timesheetForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private timesheetService: TimesheetService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.initForm();
      }
    );
  }

  onBackToList() {
    this.navigateOneStepUp();
  }

  onSubmit() {

  }

  getFormControlName(rowId: number, day: number) {
    return `${rowId}_${day}`;
  }

  private initForm() {
    let timesheetId = -1;
    let timesheetMonth = '';

    this.activeTimesheet = this.timesheetService.getTimesheet(this.id);
    timesheetId = this.activeTimesheet.id;
    timesheetMonth = `${this.activeTimesheet.month}-${this.activeTimesheet.year}`;
    const numberOfDays = this.countDaysInMonth(timesheetMonth);
    for (let dayNumber = 1; dayNumber <= numberOfDays; dayNumber++) {
      this.daysInMonth.push({ dayNumber: dayNumber, reportedHours: 0 });
    }

    this.timesheetForm = this.formBuilder.group({
      formRows: this.formBuilder.array([])
    });

    const formRows = this.timesheetForm.get('formRows') as FormArray;

    for (let row of this.activeTimesheet.rows) {
      const settings = {};
      settings[row.id] = [''];
      formRows.push(this.formBuilder.group(settings));
      formRows.push(this.initiateForm(row.id));
    }
  }

  initiateForm(rowId: number): FormGroup {
    let settings = {};
    for (let day of this.daysInMonth) {
      settings[`${rowId}_${day.dayNumber}`] = [''];
    }

    return this.formBuilder.group(settings);
  }

  private navigateOneStepUp() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  private countDaysInMonth(monthOfYear: string) {
    const month = parseInt(monthOfYear.split("-")[0]);
    const year = parseInt(monthOfYear.split("-")[1]);
    return new Date(year, month, 0).getDate();
  }
}
