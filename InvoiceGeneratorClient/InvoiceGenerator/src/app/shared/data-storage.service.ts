import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { InvoiceData } from '../invoices/invoice-data.model';
import { Invoice } from '../invoices/invoice.model';
import { InvoiceService } from '../invoices/invoice.service';
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
        private invoiceSettingsService: InvoiceSettingsService,
        private invoiceService: InvoiceService
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

    fetchUserClosedTimesheets(): Observable<Timesheet[]> {
        return this.http.get<Timesheet[]>('https://localhost:44395/api/Timesheets?State=Closed').pipe(
            map(timesheets => {
                return this.timesheetService.parseResponseTimesheetsToTimesheetsCollection(timesheets);
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
        return this.http.get<InvoiceSettings>('https://localhost:44395/api/InvoiceSettings').pipe(
            tap(settings => {
                this.invoiceSettingsService.setSettings(settings);
            })
        );
    }

    getInvoice(id: number): Observable<any> {
        return this.http.get(`https://localhost:44395/api/Invoices/${id}`, { responseType: 'arraybuffer' }).pipe(
            tap(invoiceBuffer => {

            })
        );
    }

    fetchUserInvoices(): Observable<Invoice[]> {
        return this.http.get<Invoice[]>('https://localhost:44395/api/Invoices').pipe(
            tap(invoices => {
                const invoicesToSet: Invoice[] = this.invoiceService.parseResponseInvoicesToInvoicesCollection(invoices);
                this.invoiceService.setInvoices(invoicesToSet);
            })
        );
    }

    createTimesheet(timesheet: Timesheet): Observable<Timesheet> {
        return this.http.post<Timesheet>('https://localhost:44395/api/Timesheets', timesheet).pipe(
            catchError(this.handleError),
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

    createInvoice(invoice: Invoice): Observable<InvoiceData> {
        return this.http.post<InvoiceData>('https://localhost:44395/api/Invoices', invoice).pipe(
            catchError(this.handleError),
            tap(invoiceToAdd => {
                const parsedInvoice = this.invoiceService.parseResponseInvoiceDataToInvoiceObject(invoiceToAdd);
                this.invoiceService.addInvoice(parsedInvoice);
            })
        );
    }

    updateInvoiceBlob(arrayBuffer: ArrayBuffer, id: number): Observable<void> {
        return this.http.patch<void>(`https://localhost:44395/api/Invoices?id=${id}`, arrayBuffer);
    }

    private handleError(errorResponse: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An unknown error occured!';
        if (!errorResponse.status) {
            return throwError(errorMessage);
        }
        if (errorResponse.error?.message) {
            return throwError(errorResponse.error.message);
        }
        switch (errorResponse.status) {
            case 401:
                errorMessage = 'No such user or incorrect credentials.';
                break;
            case 403:
                errorMessage = 'You are not authorized to view this resource.';
                break;
        }
        return throwError(errorMessage);
    }
}
