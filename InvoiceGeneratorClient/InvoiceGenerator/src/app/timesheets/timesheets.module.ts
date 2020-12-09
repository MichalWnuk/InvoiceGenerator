import { NgModule } from '@angular/core';
import { TimesheetsComponent } from './timesheets.component';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { TimesheetsRoutingModule } from './timesheets-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [TimesheetsComponent, TimesheetListComponent],
  imports: [
    SharedModule,
    TimesheetsRoutingModule
  ]
})
export class TimesheetsModule { }
