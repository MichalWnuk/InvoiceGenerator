import { InvoiceSettings } from '../invoiceSettings/invoiceSettings.model';
import { InvoiceItem } from './invoice-item.model';

export class InvoiceData {
    id: string;
    issuedDate: string;
    issuedPlace: string;
    invoiceNumber: string;
    invoiceSettings: InvoiceSettings;
    invoiceItems: InvoiceItem[];
    timesheetId: string;
    invoiceForYear: string;
    invoiceForMonth: string;
    taxRate: string;
    summaryNetAmount: string;
    summaryTaxAmount: string;
    summaryGrossAmount: string;
    sellDate: string;
    payToDate: string;
    issuedBy: string;
}
