import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RateType } from '../rateType.model';
import { RateTypeService } from '../ratetype.service';
import { Row } from '../row.model';
import { Timesheet } from '../timesheet.model';
import * as clone from 'clone';

@Component({
  selector: 'app-timesheet-row-add',
  templateUrl: './timesheet-row-add.component.html',
  styleUrls: ['./timesheet-row-add.component.css']
})
export class TimesheetRowAddComponent implements OnInit, OnDestroy {
  @Output() closePopup = new EventEmitter<void>();
  @ViewChild('rowForm', { static: false }) rowForm: NgForm;
  @Input() currentTimesheet: Timesheet;
  row: Row;
  rateTypes: RateType[] = [];
  updateTimesheetSub: Subscription;
  refreshTimesheetsSub: Subscription;

  constructor(
    private rateTypeService: RateTypeService,
    private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.rateTypes = this.rateTypeService.getRateTypes();
  }

  ngOnDestroy(): void {
    this.updateTimesheetSub.unsubscribe();
    this.refreshTimesheetsSub.unsubscribe();
  }

  onClose(): void {
    this.closePopup.emit();
  }

  onSubmit(): void {
    const row: Row = new Row();
    row.rateTypeId = this.rateTypes.find(rateType => rateType.id === +this.rowForm.value.rateType).id;
    row.days = [];
    row.timesheetId = this.currentTimesheet.id;
    const modifiedTimesheet = clone(this.currentTimesheet);
    modifiedTimesheet.rows.push(row);
    this.updateTimesheetSub = this.dataStorageService.updateTimesheet(modifiedTimesheet).subscribe(data => {
      this.refreshTimesheetsSub = this.dataStorageService.fetchUserTimesheets().subscribe(() => {
        this.rowForm.reset();
        this.onClose();
      });
    });
  }
}
