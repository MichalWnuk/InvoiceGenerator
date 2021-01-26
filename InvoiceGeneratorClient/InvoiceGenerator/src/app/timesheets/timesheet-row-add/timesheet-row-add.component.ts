import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RateType } from '../rateType.model';
import { RateTypeService } from '../ratetype.service';
import { Row } from '../row.model';
import { Timesheet } from '../timesheet.model';
import { TimesheetService } from '../timesheet.service';

@Component({
  selector: 'app-timesheet-row-add',
  templateUrl: './timesheet-row-add.component.html',
  styleUrls: ['./timesheet-row-add.component.css']
})
export class TimesheetRowAddComponent implements OnInit {
  @Output() closePopup = new EventEmitter<void>();
  @ViewChild('rowForm', { static: false }) rowForm: NgForm;
  @Input() currentTimesheet: Timesheet;
  row: Row;
  rateTypes: RateType[] = [];

  constructor(private timesheetService: TimesheetService, private rateTypeService: RateTypeService) { }

  onClose(): void {
    this.closePopup.emit();
  }

  onSubmit(): void {
    const row: Row = new Row();
    row.rateType = this.rateTypes.find(rateType => rateType.id === +this.rowForm.value.rateType);
    row.days = [];
    row.id = Math.floor(Math.random() * 1000); // To be replaced by real ID from DB
    this.currentTimesheet.rows.push(row);
    this.timesheetService.updateTimesheet(this.currentTimesheet);
    console.log(this.rowForm.value);
    this.rowForm.reset();
    this.onClose();
  }

  ngOnInit(): void {
    this.rateTypes = this.rateTypeService.getRateTypes();
  }

}
