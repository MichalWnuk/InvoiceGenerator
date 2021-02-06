import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InvoiceSettings } from '../invoiceSettings/invoiceSettings.model';
import { InvoiceSettingsService } from '../invoiceSettings/invoiceSettings.service';
import { RateSettings } from '../rateSettings/rateSettings.model';
import { RateSettingsService } from '../rateSettings/rateSettings.service';
import { RateSettingsItem } from '../rateSettings/rateSettingsItem.model';
import { RateType } from '../timesheets/rateType.model';
import { RateTypeService } from '../timesheets/ratetype.service';
import { Timesheet } from '../timesheets/timesheet.model';
import { TimesheetService } from '../timesheets/timesheet.service';

@Injectable()
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private rateTypeService: RateTypeService,
        private timesheetService: TimesheetService,
        private rateSettingsService: RateSettingsService,
        private invoiceSettingsService: InvoiceSettingsService
    ) { }

    fetchRateTypes(): Observable<RateType[]> {
        return this.http.get<RateType[]>('https://localhost:44395/api/RateTypes').pipe(
            tap(rateTypes => {
                this.rateTypeService.setRateTypes(rateTypes);
            })
        );
    }

    fetchUserTimesheets(): Observable<Timesheet[]> {
        return this.http.get<Timesheet[]>('https://localhost:44395/api/Timesheets').pipe(
            tap(timesheets => {
                const timesheetsToSet: Timesheet[] = this.timesheetService.parseResponseTimesheetsToTimesheetsCollection(timesheets);
                this.timesheetService.setTimesheets(timesheetsToSet);
            })
        );
    }

    fetchUserRateSettings(): Observable<RateSettings> {
        return this.http.get<any>('https://localhost:44395/api/RateAmounts').pipe(
            tap(settings => {
                const settingsToSet: RateSettings = this.rateSettingsService.parseResponseSettingsToSettings(settings);
                this.rateSettingsService.setSettings(settingsToSet);
            })
        );
    }

    fetchUserInvoiceSettings(): Observable<InvoiceSettings> {
        return this.http.get<any>('https://localhost:44395/api/InvoiceSettings').pipe(
            tap(settings => {
                this.invoiceSettingsService.setSettings(settings);
            })
        );
    }

    createTimesheet(timesheet: Timesheet): Observable<Timesheet> {
        return this.http.post<Timesheet>('https://localhost:44395/api/Timesheets', timesheet).pipe(
            tap(createdTimesheet => {
                const timesheetToAdd: Timesheet = this.timesheetService.parseResponseTimesheetToTimesheetObject(createdTimesheet);
                this.timesheetService.addTimesheet(timesheetToAdd);
            })
        );
    }

    updateTimesheet(timesheet: Timesheet): Observable<void> {
        return this.http.put<void>(`https://localhost:44395/api/Timesheets/${timesheet.id}`, timesheet);
    }

    updateRateSettings(settings: RateSettingsItem[]): Observable<void> {
        return this.http.put<void>('https://localhost:44395/api/RateAmounts', settings);
    }

    updateInvoiceSettings(settings: InvoiceSettings): Observable<void> {
        return this.http.put<void>('https://localhost:44395/api/InvoiceSettings', settings);
    }
}
