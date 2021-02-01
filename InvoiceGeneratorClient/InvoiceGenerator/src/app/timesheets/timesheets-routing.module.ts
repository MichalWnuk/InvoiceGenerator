import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RateTypeResolver } from './rateType.resolver';
import { TimesheetEditComponent } from './timesheet-edit/timesheet-edit.component';
import { TimesheetResolver } from './timesheet.resolver';
import { TimesheetsComponent } from './timesheets.component';

const routes: Routes = [
    { path: '', component: TimesheetsComponent, canActivate: [AuthGuard], resolve: [RateTypeResolver, TimesheetResolver] },
    { path: ':id', component: TimesheetEditComponent, canActivate: [AuthGuard], resolve: [RateTypeResolver] }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TimesheetsRoutingModule { }
