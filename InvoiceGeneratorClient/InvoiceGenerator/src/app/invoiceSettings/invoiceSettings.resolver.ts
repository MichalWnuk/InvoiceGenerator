import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { InvoiceSettings } from './invoiceSettings.model';
import { InvoiceSettingsService } from './invoiceSettings.service';

@Injectable({
    providedIn: 'root'
})
export class InvoiceSettingsResolver implements Resolve<InvoiceSettings> {
    constructor(private dataStorageService: DataStorageService, private settingsService: InvoiceSettingsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InvoiceSettings> | InvoiceSettings {
        return this.dataStorageService.fetchUserInvoiceSettings();
    }
}
