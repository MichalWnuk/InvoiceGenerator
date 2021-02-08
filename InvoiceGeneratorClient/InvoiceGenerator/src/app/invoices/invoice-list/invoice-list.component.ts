import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Invoice } from '../invoice.model';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit, OnDestroy {
  headers: string[];
  invoices: Invoice[];
  invoicesSubscription: Subscription;
  getInvoiceSubscription: Subscription;
  isAdding = false;

  constructor(private invoiceService: InvoiceService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.headers = [
      'Year',
      'Month',
      'Invoice Number'
    ];

    this.invoicesSubscription =
      this.invoiceService.invoicesChanged.subscribe((invoices: Invoice[]) => { this.invoices = invoices; });
    this.invoices = this.invoiceService.getInvoices();
  }

  ngOnDestroy(): void {
    this.invoicesSubscription.unsubscribe();

    if (this.getInvoiceSubscription) {
      this.getInvoiceSubscription.unsubscribe();
    }
  }

  onAddInvoice(): void {
    this.isAdding = true;
  }

  onFinishedAdding(): void {
    this.isAdding = false;
  }

  getInvoice(id: number): void {
    this.getInvoiceSubscription = this.dataStorageService.getInvoice(id).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
        alert('Please disable your Pop-up blocker and try again.');
      }
    });
  }

}
