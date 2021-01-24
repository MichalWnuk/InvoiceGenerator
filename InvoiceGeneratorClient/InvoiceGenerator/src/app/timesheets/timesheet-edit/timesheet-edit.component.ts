import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Row } from '../row.model';
import { Timesheet } from '../timesheet.model';
import { TimesheetService } from '../timesheet.service';

@Component({
  selector: 'app-timesheet-edit',
  templateUrl: './timesheet-edit.component.html',
  styleUrls: ['./timesheet-edit.component.css']
})
export class TimesheetEditComponent implements OnInit {
  currentTimesheet: Timesheet;
  loadedRow: Row;
  headers: string[] = [];
  isRowLoaded = false;
  rowForm: FormGroup;
  isAddingRow = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timesheetService: TimesheetService) { }

  get controls(): AbstractControl[] {
    return (this.rowForm.get('days') as FormArray).controls;
  }

  get currentMonthString(): string {
    return new Date(this.currentTimesheet.year, this.currentTimesheet.month).toISOString().slice(0, 7);
  }

  get minDateForCurrentTimesheet(): string {
    return new Date(this.currentTimesheet.year, this.currentTimesheet.month - 1, 2).toISOString().slice(0, 10);
  }

  get maxDateForCurrentTimesheet(): string {
    return new Date(this.currentTimesheet.year, this.currentTimesheet.month).toISOString().slice(0, 10);
  }

  ngOnInit(): void {
    this.headers = [
      'Row Type',
      'Reported Hours'
    ];

    this.route.params.subscribe(
      (params: Params) => {
        this.currentTimesheet = this.timesheetService.getTimesheet(+params.id);
      }
    );

    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.isRowLoaded = queryParams.Row != null;
        if (this.isRowLoaded) {
          this.loadedRow = this.currentTimesheet.rows.find(row => row.id === +queryParams.Row);
          this.initRowForm();
        }
      }
    );


  }

  onBackToList(): void {
    this.navigateOneStepUp();
  }

  onSubmit(): void {

  }

  onAddRow(): void {
    this.isAddingRow = true;
  }

  onFinishedAddingRow(): void {
    this.isAddingRow = false;
  }

  onAddDay(): void {
    (this.rowForm.get('days') as FormArray).push(
      new FormGroup({
        dayNumber: new FormControl(
          null, [
          Validators.required,
          this.minDate(new Date(this.minDateForCurrentTimesheet)),
          this.maxDate(new Date(this.maxDateForCurrentTimesheet))]),
        reportedHours: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(24)])
      })
    );
  }

  onRowSave(): void {

  }

  // tslint:disable-next-line: typedef
  minDate(date: Date) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== null && (new Date(control.value) < date)) {
        return { minDate: true };
      }

      return null;
    };
  }

  // tslint:disable-next-line: typedef
  maxDate(date: Date) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== null && (new Date(control.value) > date)) {
        return { maxDate: true };
      }

      return null;
    };
  }

  private navigateOneStepUp(): void {
    if (this.isRowLoaded) {
      this.router.navigate(['.'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  private initRowForm(): void {
    const rowDays = new FormArray([]);

    if (this.loadedRow.days) {
      for (const day of this.loadedRow.days) {
        rowDays.push(
          new FormGroup({
            dayNumber: new FormControl(this.convertDayNumberToDate(day.dayNumber), [
              Validators.required,
              this.minDate(new Date(this.minDateForCurrentTimesheet)),
              this.maxDate(new Date(this.maxDateForCurrentTimesheet))]),
            reportedHours: new FormControl(day.reportedHours, [Validators.required, Validators.min(0), Validators.max(24)])
          })
        );
      }
    }

    this.rowForm = new FormGroup({
      days: rowDays
    });
  }

  private convertDayNumberToDate(dayNumber: number): string {
    return new Date(this.currentTimesheet.year, this.currentTimesheet.month - 1, dayNumber + 1).toISOString().slice(0, 10);
  }
}
