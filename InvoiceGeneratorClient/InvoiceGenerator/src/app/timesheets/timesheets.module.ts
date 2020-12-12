import { NgModule } from '@angular/core';
import { TimesheetsComponent } from './timesheets.component';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { TimesheetsRoutingModule } from './timesheets-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TimesheetEditComponent } from './timesheet-edit/timesheet-edit.component';
import { TimesheetAddComponent } from './timesheet-add/timesheet-add.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TimesheetsComponent,
    TimesheetListComponent,
    TimesheetEditComponent,
    TimesheetAddComponent
  ],
  imports: [
    SharedModule,
    TimesheetsRoutingModule,
    FormsModule
  ],
  exports: [
    TimesheetsComponent,
    TimesheetListComponent
  ]
})
export class TimesheetsModule { }
