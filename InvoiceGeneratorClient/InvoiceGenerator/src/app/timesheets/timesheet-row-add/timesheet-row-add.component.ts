import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RateType } from '../rateType.model';
import { RateTypeService } from '../ratetype.service';
import { Row } from '../row.model';

@Component({
  selector: 'app-timesheet-row-add',
  templateUrl: './timesheet-row-add.component.html',
  styleUrls: ['./timesheet-row-add.component.css']
})
export class TimesheetRowAddComponent implements OnInit {
  @Output() closePopup = new EventEmitter<void>();
  @ViewChild('rowForm', { static: false }) rowForm: NgForm;
  row: Row;
  rateTypes: RateType[] = [];

  constructor(private rateTypeService: RateTypeService) { }

  onClose(): void {
    this.closePopup.emit();
  }

  onSubmit(): void {
    console.log(this.rowForm.value);
    this.rowForm.reset();
    this.onClose();
  }

  ngOnInit(): void {
    this.rateTypes = this.rateTypeService.getRateTypes();
  }

}
