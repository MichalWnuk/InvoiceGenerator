import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Timesheet } from 'src/app/timesheets/timesheet.model';
import { Invoice } from '../invoice.model';

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

  ngOnInit(): void {
    this.timesheetsSub = this.dataStorageService.fetchUserTimesheets().subscribe(timesheets => {
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
    this.generateInvoice();
    // this.invoiceSub = this.dataStorageService.createInvoice(invoice).subscribe(data => {
    //   const doc = new jsPDF();
    //   doc.text('Miejsce wystawienia: {Wrocław}', 10, 10, { align: 'right' });
    //   const arrayBuffer: ArrayBuffer = doc.output('arraybuffer');
    //   this.timesheetsBlobSub = this.dataStorageService.updateInvoiceBlob(arrayBuffer, data.id).subscribe(blobResponse => {
    //     this.invoiceForm.reset();
    //     this.closeEvent.emit();
    //   });
    // }, errorMessage => {
    //   this.invoiceForm.reset();
    //   this.error = errorMessage;
    // });
  }

  private generateInvoice(): void {
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(11);
    doc.text('Miejsce wystawienia: {Wroclaw}', 140, 10);
    doc.text('Data wystawienia: {29.01.2021}', 140, 15);
    doc.setLineWidth(0.5);
    doc.line(20, 20, 180, 20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.text('Faktura nr: {1/01/2021}', 20, 30);
    doc.line(20, 34, 180, 34);
    doc.setFontSize(14);
    doc.text('Sprzedawca', 20, 45);
    doc.text('Nabywca', 133, 45, { align: 'right' });
    doc.line(20, 47, 180, 47);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text('{Michal Wnuk Software Development}', 20, 52);
    doc.line(110, 47, 110, 83);
    doc.text('{ITFS Sp. z o.o.}', 112, 52);
    doc.text('{ul. Sw. Anny 4}', 20, 56);
    doc.text('{ul. Pawla Gdanca 6B/2}', 112, 56);
    doc.text('{34-240 Jordanow}', 20, 60);
    doc.text('{80-336 Gdansk}', 112, 60);
    doc.text('{NIP: 5521722170}', 20, 64);
    doc.text('{Tel: 533 332 494}', 112, 64);
    doc.text('{Email: michal.wnuk.software@gmail.com}', 20, 68);
    doc.text('{NIP: 5842726852}', 112, 68);
    doc.text('{Bank: ING Bank Slaski}', 20, 72);
    doc.text('{Nr konta: 24 1050 1575 1000 0092 5472 5469}', 20, 76);
    autoTable(
      doc, {
      head: this.createPositionHeaders(),
      body: this.generatePositionData(),
      startY: 86, theme: 'grid',
      headStyles: {
        fillColor: [218, 218, 218],
        textColor: [0, 0, 0]
      }
    });
    autoTable(
      doc, {
      head: this.createSummaryHeaders(),
      body: this.generateSummaryData(),
      startY: 200, theme: 'grid',
      headStyles: {
        fillColor: [218, 218, 218],
        textColor: [0, 0, 0]
      }
    });
    doc.text('Sposob zaplaty: przelew na konto', 20, 236);
    doc.text('Data sprzedazy: {29.01.2021}', 20, 240);
    doc.text('Termin platnosci: {28.02.2021}', 20, 244);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Do zaplaty: {20004.72} zl', 20, 256);
    doc.setFontSize(14);
    doc.text('{Michal Wnuk}', 160, 266, { align: 'right' });
    doc.line(120, 270, 180, 270);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Osoba upowazniona do wystawienia', 180, 276, { align: 'right' });
    doc.save('aaaa.pdf');
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

  generatePositionData(): string[][] {
    const result: string[][] = [];
    const rows = [
      '1',
      'Usluga zgodnie z umowa z dnia 01.10.2020 za okres 01.01.2021 - 31.12.',
      '152',
      'godzina',
      '107.00',
      '16264.00',
      '23%',
      '3740.72',
      '20004.72'
    ];

    result.push(rows);
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

  generateSummaryData(): string[][] {
    const result: string[][] = [];
    const row1 = [
      'W tym:',
      '16264.00',
      '23%',
      '3740.72',
      '20004.72'
    ];

    const row2 = [
      'Razem:',
      '16264.00',
      '',
      '3740.72',
      '20004.72'
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
