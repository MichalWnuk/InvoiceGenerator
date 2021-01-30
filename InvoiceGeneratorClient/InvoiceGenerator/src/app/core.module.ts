import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { TimesheetService } from './timesheets/timesheet.service';
import { RateTypeService } from './timesheets/ratetype.service';

@NgModule({
    providers: [TimesheetService, RateTypeService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class CoreModule { }
