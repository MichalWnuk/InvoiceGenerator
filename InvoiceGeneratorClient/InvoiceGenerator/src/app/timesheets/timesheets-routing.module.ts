import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { TimesheetEditComponent } from './timesheet-edit/timesheet-edit.component';
import { TimesheetsComponent } from './timesheets.component';

const routes: Routes = [
    { path: '', component: TimesheetsComponent },
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