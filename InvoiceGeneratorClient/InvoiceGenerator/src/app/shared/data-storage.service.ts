import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Settings } from '../settings/settings.model';
import { SettingsService } from '../settings/settings.service';
import { SettingsItem } from '../settings/settingsItem.model';
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
        private settingsService: SettingsService
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

    fetchUserSettings(): Observable<Settings> {
        return this.http.get<any>('https://localhost:44395/api/RateAmounts').pipe(
            tap(settings => {
                const settingsToSet: Settings = this.settingsService.parseResponseSettingsToSettings(settings);
                this.settingsService.setSettings(settingsToSet);
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

    updateSettings(settings: SettingsItem[]): Observable<void> {
        return this.http.put<void>('https://localhost:44395/api/RateAmounts', settings);
    }
}
