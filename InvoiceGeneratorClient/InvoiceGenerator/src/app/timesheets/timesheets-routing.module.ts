import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { TimesheetAddComponent } from './timesheet-add/timesheet-add.component';
import { TimesheetEditComponent } from './timesheet-edit/timesheet-edit.component';
import { TimesheetsComponent } from './timesheets.component';

const routes: Routes = [
    { path: '', component: TimesheetsComponent },
    { path: 'new', component: TimesheetAddComponent },
    { path: ':id', component: TimesheetEditComponent }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TimesheetsRoutingModule { }