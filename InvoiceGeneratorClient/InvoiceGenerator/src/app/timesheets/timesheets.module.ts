import { NgModule } from '@angular/core';
import { TimesheetsComponent } from './timesheets.component';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { TimesheetsRoutingModule } from './timesheets-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TimesheetEditComponent } from './timesheet-edit/timesheet-edit.component';
import { TimesheetAddComponent } from './timesheet-add/timesheet-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimesheetService } from './timesheet.service';
import { TimesheetRowAddComponent } from './timesheet-row-add/timesheet-row-add.component';
import { RateTypeService } from './ratetype.service';



@NgModule({
  declarations: [
    TimesheetsComponent,
    TimesheetListComponent,
    TimesheetEditComponent,
    TimesheetAddComponent,
    TimesheetRowAddComponent
  ],
  imports: [
    SharedModule,
    TimesheetsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TimesheetsComponent,
    TimesheetListComponent
  ],
  providers: [TimesheetService, RateTypeService]
})
export class TimesheetsModule { }
