import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InvoiceData } from './invoice-data.model';
import { Invoice } from './invoice.model';

@Injectable()
export class InvoiceService {
    invoicesChanged = new Subject<Invoice[]>();
    private invoices: Invoice[];

    constructor() { }

    setInvoices(invoices: Invoice[]): void {
        this.invoices = invoices;
        this.invoicesChanged.next(this.getInvoices());
    }

    getInvoices(): Invoice[] {
        return this.invoices.slice();
    }

    addInvoice(invoice: Invoice): void {
        this.invoices.push(invoice);
        this.invoicesChanged.next(this.getInvoices());
    }

    parseResponseInvoicesToInvoicesCollection(invoices: Invoice[]): Invoice[] {
        const output: Invoice[] = [];
        invoices.forEach(invoice => {
            const parsedInvoice: Invoice = this.parseResponseInvoiceToInvoiceObject(invoice);
            output.push(parsedInvoice);
        });

        return output;
    }

    parseResponseInvoiceToInvoiceObject(invoice: Invoice): Invoice {
        const output: Invoice = {
            id: invoice.id,
            invoiceNumber: invoice.invoiceNumber,
            generatedDate: new Date(invoice.generatedDate),
            timesheetId: invoice.timesheetId,
            invoiceForMonth: invoice.invoiceForMonth,
            invoiceForYear: invoice.invoiceForYear
        };

        return output;
    }

    parseResponseInvoiceDataToInvoiceObject(invoiceData: InvoiceData): Invoice {
        const output: Invoice = {
            id: +invoiceData.id,
            invoiceNumber: invoiceData.invoiceNumber,
            generatedDate: new Date(invoiceData.issuedDate),
            timesheetId: +invoiceData.timesheetId,
            invoiceForMonth: invoiceData.invoiceForMonth,
            invoiceForYear: invoiceData.invoiceForYear
        };

        return output;
    }
}
