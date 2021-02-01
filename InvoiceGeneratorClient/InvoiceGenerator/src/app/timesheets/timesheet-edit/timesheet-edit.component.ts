import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Day } from '../day.model';
import { RateTypeService } from '../ratetype.service';
import { Row } from '../row.model';
import { Timesheet } from '../timesheet.model';
import { TimesheetService } from '../timesheet.service';

@Component({
  selector: 'app-timesheet-edit',
  templateUrl: './timesheet-edit.component.html',
  styleUrls: ['./timesheet-edit.component.css']
})
export class TimesheetEditComponent implements OnInit, OnDestroy {
  currentTimesheet: Timesheet;
  loadedRow: Row;
  headers: string[] = [];
  isRowLoaded = false;
  rowForm: FormGroup;
  isAddingRow = false;
  updateTimesheetSub: Subscription;
  finishedSaving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timesheetService: TimesheetService,
    private rateTypeService: RateTypeService,
    private dataStorageService: DataStorageService) { }

  get controls(): AbstractControl[] {
    return (this.rowForm.get('days') as FormArray).controls;
  }

  get currentMonthString(): string {
    return this.currentTimesheet.date.toISOString().slice(0, 7);
  }

  get minDateForCurrentTimesheet(): string {
    return this.currentTimesheet.date.toISOString().slice(0, 10);
  }

  get maxDateForCurrentTimesheet(): string {
    const nextMonth = this.currentTimesheet.date.getMonth() + 1;
    const currentTimesheetYear = this.currentTimesheet.date.getUTCFullYear();
    return new Date(currentTimesheetYear, nextMonth).toISOString().slice(0, 10);
  }

  get dayAddedMessage(): string {
    return 'Timesheet saved.';
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

  ngOnDestroy(): void {
    if (this.updateTimesheetSub) {
      this.updateTimesheetSub.unsubscribe();
    }
  }

  getReportedHoursString(row: Row): string {
    let hoursCount = 0;

    if (row.days && row.days.length > 0) {
      row.days?.forEach(day => {
        hoursCount += day.reportedHours;
      });
    }

    return `${hoursCount}`;
  }

  getRateTypeNameString(id: number): string {
    return this.rateTypeService.getRateTypeDisplayName(id);
  }

  onBackToList(): void {
    this.navigateOneStepUp();
  }

  onSubmit(): void {
    const newDaysArray: Day[] = [];
    this.rowForm.value.days.forEach(dayElem => {
      const dayObj = new Day();
      dayObj.date = new Date(dayElem.day);
      dayObj.reportedHours = dayElem.reportedHours;
      newDaysArray.push(dayObj);
    });
    this.loadedRow.days = newDaysArray;
    this.updateTimesheetSub = this.dataStorageService.updateTimesheet(this.currentTimesheet).subscribe(data => {
      this.finishedSaving = true;
    });
    this.timesheetService.updateTimesheet(this.currentTimesheet);
    console.log(this.rowForm.value);
  }

  onAddRow(): void {
    this.isAddingRow = true;
  }

  onFinishedAddingRow(): void {
    this.currentTimesheet = this.timesheetService.getTimesheet(this.currentTimesheet.id);
    this.isAddingRow = false;
  }

  onAddDay(): void {
    (this.rowForm.controls.days as FormArray).push(
      new FormGroup({
        day: new FormControl(
          null, [
          Validators.required,
          this.minDate(new Date(this.minDateForCurrentTimesheet)),
          this.maxDate(new Date(this.maxDateForCurrentTimesheet))]),
        reportedHours: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(24)])
      }, this.hasControlAdded())
    );
  }

  onRemoveDay(dayControlIndex: number): void {
    (this.rowForm.controls.days as FormArray).removeAt(dayControlIndex);
  }

  minDate(date: Date): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== null && (new Date(control.value) < date)) {
        return { minDate: true };
      }

      return null;
    };
  }

  maxDate(date: Date): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== null && (new Date(control.value) > date)) {
        return { maxDate: true };
      }

      return null;
    };
  }

  hasControlAdded(): ValidatorFn {
    return (group: FormGroup): { [key: string]: boolean } => {
      if (group.controls && (group.controls.day?.value?.length > 0 || group.controls.days?.value?.length)) {
        return null;
      }
      return { hasControlAdded: true };
    };
  }

  onFinishedSaving(): void {
    this.finishedSaving = false;
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
      for (const loadedDay of this.loadedRow.days) {
        rowDays.push(
          new FormGroup({
            day: new FormControl(this.convertDateToInput(loadedDay.date), [
              Validators.required,
              this.minDate(new Date(this.minDateForCurrentTimesheet)),
              this.maxDate(new Date(this.maxDateForCurrentTimesheet))]),
            reportedHours: new FormControl(loadedDay.reportedHours, [Validators.required, Validators.min(0), Validators.max(24)])
          })
        );
      }
    }

    this.rowForm = new FormGroup({
      days: rowDays
    }, this.hasControlAdded());
  }

  private convertDateToInput(date: Date): string {
    return date.toISOString().slice(0, 10);
  }
}
