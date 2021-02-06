import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InvoiceSettings } from './invoiceSettings.model';
import * as clone from 'clone';

@Injectable()
export class InvoiceSettingsService {
    invoiceSettingsChanged = new Subject<InvoiceSettings>();
    private invoiceSettings: InvoiceSettings;

    constructor() { }

    setSettings(settings: InvoiceSettings): void {
        this.invoiceSettings = settings;
        this.invoiceSettingsChanged.next(this.getSettings());
    }

    getSettings(): InvoiceSettings {
        const invoiceSettings = clone(this.invoiceSettings);
        return invoiceSettings;
    }
}
