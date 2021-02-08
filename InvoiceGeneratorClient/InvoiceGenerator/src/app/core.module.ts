import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { TimesheetService } from './timesheets/timesheet.service';
import { RateTypeService } from './timesheets/ratetype.service';
import { DataStorageService } from './shared/data-storage.service';
import { RateSettingsService } from './rateSettings/rateSettings.service';
import { InvoiceSettingsService } from './invoiceSettings/invoiceSettings.service';
import { InvoiceService } from './invoices/invoice.service';

@NgModule({
    providers: [
        DataStorageService,
        TimesheetService,
        RateTypeService,
        RateSettingsService,
        InvoiceSettingsService,
        InvoiceService,

        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class CoreModule { }
