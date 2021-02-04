import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { TimesheetService } from './timesheets/timesheet.service';
import { RateTypeService } from './timesheets/ratetype.service';
import { DataStorageService } from './shared/data-storage.service';
import { SettingsService } from './settings/settings.service';

@NgModule({
    providers: [
        DataStorageService,
        TimesheetService,
        RateTypeService,
        SettingsService,

        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class CoreModule { }
