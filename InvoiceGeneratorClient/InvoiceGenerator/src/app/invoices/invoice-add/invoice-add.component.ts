import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Timesheet } from 'src/app/timesheets/timesheet.model';
import { Invoice } from '../invoice.model';
import { InvoiceData } from '../invoice-data.model';
import { InvoiceItem } from '../invoice-item.model';

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.css']
})
export class InvoiceAddComponent implements OnInit, OnDestroy {
  @Output() closeEvent = new EventEmitter();
  @ViewChild('invoiceForm', { static: false }) invoiceForm: NgForm;
  invoiceSub: Subscription;
  timesheets: Timesheet[];
  timesheetsSub: Subscription;
  timesheetsBlobSub: Subscription;
  error: string = null;
  constructor(private dataStorageService: DataStorageService) { }

  gettimesheetDropdownDisplay(timesheet: Timesheet): string {
    const timesheetMonth = timesheet.date.getMonth() + 1;
    const timesheetYear = timesheet.date.getFullYear();

    return `${timesheetYear}-${timesheetMonth}`;
  }

  ngOnInit(): void {
    this.timesheetsSub = this.dataStorageService.fetchUserClosedTimesheets().subscribe(timesheets => {
      this.timesheets = timesheets;
    });
  }

  ngOnDestroy(): void {
    if (this.invoiceSub) {
      this.invoiceSub.unsubscribe();
    }
    if (this.timesheetsSub) {
      this.timesheetsSub.unsubscribe();
    }
    if (this.timesheetsBlobSub) {
      this.timesheetsBlobSub.unsubscribe();
    }
  }

  onSubmit(): void {
    this.error = null;
    const invoice: Invoice = new Invoice();
    invoice.id = 0;
    invoice.timesheetId = this.invoiceForm.value.timesheet;
    this.invoiceSub = this.dataStorageService.createInvoice(invoice).subscribe(data => {
      const doc = this.generateInvoice(data);
      const arrayBuffer: ArrayBuffer = doc.output('arraybuffer');
      this.timesheetsBlobSub = this.dataStorageService.updateInvoiceBlob(arrayBuffer, +data.id).subscribe(blobResponse => {
        this.invoiceForm.reset();
        this.closeEvent.emit();
      });
    }, errorMessage => {
      this.invoiceForm.reset();
      this.error = errorMessage;
    });
  }

  private generateInvoice(invoiceData: InvoiceData): jsPDF {
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(11);
    doc.text(`Miejsce wystawienia: ${invoiceData.issuedPlace}`, 140, 10);
    doc.text(`Data wystawienia: ${invoiceData.issuedDate}`, 140, 15);
    doc.setLineWidth(0.5);
    doc.line(20, 20, 180, 20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.text(`Faktura nr: ${invoiceData.invoiceNumber}`, 20, 30);
    doc.line(20, 34, 180, 34);
    doc.setFontSize(14);
    doc.text('Sprzedawca', 20, 45);
    doc.text('Nabywca', 133, 45, { align: 'right' });
    doc.line(20, 47, 180, 47);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`${invoiceData.invoiceSettings.sellerName}`, 20, 52);
    doc.line(110, 47, 110, 83);
    doc.text(`${invoiceData.invoiceSettings.buyerName}`, 112, 52);
    doc.text(`${invoiceData.invoiceSettings.sellerAddressLine1}`, 20, 56);
    doc.text(`${invoiceData.invoiceSettings.buyerAddressLine1}`, 112, 56);
    doc.text(`${invoiceData.invoiceSettings.sellerAddressLine2}`, 20, 60);
    doc.text(`${invoiceData.invoiceSettings.buyerAddressLine2}`, 112, 60);
    doc.text(`${invoiceData.invoiceSettings.sellerTaxId}`, 20, 64);
    doc.text(`${invoiceData.invoiceSettings.buyerPhone}`, 112, 64);
    doc.text(`${invoiceData.invoiceSettings.sellerEmail}`, 20, 68);
    doc.text(`${invoiceData.invoiceSettings.buyerTaxId}`, 112, 68);
    doc.text(`${invoiceData.invoiceSettings.sellerBankName}`, 20, 72);
    doc.text(`${invoiceData.invoiceSettings.sellerAccountNumber}`, 20, 76);
    autoTable(
      doc, {
      head: this.createPositionHeaders(),
      body: this.generatePositionData(invoiceData.invoiceItems),
      startY: 86, theme: 'grid',
      headStyles: {
        fillColor: [218, 218, 218],
        textColor: [0, 0, 0]
      }
    });
    autoTable(
      doc, {
      head: this.createSummaryHeaders(),
      body: this.generateSummaryData(invoiceData),
      startY: 200, theme: 'grid',
      headStyles: {
        fillColor: [218, 218, 218],
        textColor: [0, 0, 0]
      }
    });
    doc.text('Sposob zaplaty: przelew na konto', 20, 236);
    doc.text(`Data sprzedazy: ${invoiceData.sellDate}`, 20, 240);
    doc.text(`Termin platnosci: ${invoiceData.payToDate}`, 20, 244);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(`Do zaplaty: ${invoiceData.summaryGrossAmount} zl`, 20, 256);
    doc.setFontSize(14);
    doc.text(`${invoiceData.issuedBy}`, 160, 266, { align: 'right' });
    doc.line(120, 270, 180, 270);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Osoba upowazniona do wystawienia', 180, 276, { align: 'right' });
    doc.save('invoice.pdf');
    return doc;
  }

  createPositionHeaders(): any[] {
    const headers = [
      'Lp.',
      'Nazwa towaru/uslugi',
      'Ilosc',
      'Jednostka miary',
      'Cena jednostkowa netto',
      'Wartosc netto',
      'Stawka VAT',
      'Kwota VAT',
      'Wartosc brutto',
    ];

    return [headers];
  }

  generatePositionData(items: InvoiceItem[]): string[][] {
    const result: string[][] = [];
    let itemCount = 1;
    items.forEach(item => {
      const row = [
        `${itemCount}`,
        `${item.title}`,
        `${item.count}`,
        `${item.metric}`,
        `${item.netPrice}`,
        `${item.netAmount}`,
        `${item.taxRate}`,
        `${item.taxAmount}`,
        `${item.grossAmount}`
      ];

      itemCount++;
      result.push(row);
    });
    return result;
  }

  createSummaryHeaders(): any[] {
    const headers = [
      '',
      'Netto',
      'Stawka VAT',
      'VAT',
      'Brutto'
    ];

    return [headers];
  }

  generateSummaryData(invoiceData: InvoiceData): string[][] {
    const result: string[][] = [];
    const row1 = [
      'W tym:',
      `${invoiceData.summaryNetAmount}`,
      `${invoiceData.taxRate}`,
      `${invoiceData.summaryTaxAmount}`,
      `${invoiceData.summaryGrossAmount}`
    ];

    const row2 = [
      'Razem:',
      `${invoiceData.summaryNetAmount}`,
      '',
      `${invoiceData.summaryTaxAmount}`,
      `${invoiceData.summaryGrossAmount}`
    ];

    result.push(row1);
    result.push(row2);
    return result;
  }

  onCancel(): void {
    this.error = null;
    this.closeEvent.emit();
  }

}
