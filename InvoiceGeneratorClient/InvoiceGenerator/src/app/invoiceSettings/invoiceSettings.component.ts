import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { InvoiceSettings } from './invoiceSettings.model';
import { InvoiceSettingsService } from './invoiceSettings.service';

@Component({
  selector: 'app-invoice-settings',
  templateUrl: './invoiceSettings.component.html',
  styleUrls: ['./invoiceSettings.component.css']
})
export class InvoiceSettingsComponent implements OnInit, OnDestroy {
  invoiceSettingsForm: FormGroup;
  userInvoiceSettings: InvoiceSettings;
  invoiceSettingsSubscription: Subscription;
  saveInvoiceSettingsSubscription: Subscription;
  finishedSaving = false;

  constructor(private settingsService: InvoiceSettingsService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.invoiceSettingsSubscription =
      this.settingsService.invoiceSettingsChanged.subscribe((sett: InvoiceSettings) => { this.userInvoiceSettings = sett; });
    this.userInvoiceSettings = this.settingsService.getSettings();
    this.initInvoiceSettingsForm();
  }

  ngOnDestroy(): void {
    this.invoiceSettingsSubscription.unsubscribe();
    if (this.saveInvoiceSettingsSubscription) {
      this.saveInvoiceSettingsSubscription.unsubscribe();
    }
  }

  get settingsSavedMessage(): string {
    return 'Invoice settings were successfully saved.';
  }

  onFinishedSaving(): void {
    this.finishedSaving = false;
  }

  onSubmit(): void {
    const newInvoiceSettings: InvoiceSettings = {
      sellerName: this.invoiceSettingsForm.value.sellerName,
      sellerAddressLine1: this.invoiceSettingsForm.value.sellerAddressLine1,
      sellerAddressLine2: this.invoiceSettingsForm.value.sellerAddressLine2,
      sellerTaxId: this.invoiceSettingsForm.value.sellerTaxId,
      sellerEmail: this.invoiceSettingsForm.value.sellerEmail,
      sellerBankName: this.invoiceSettingsForm.value.sellerBankName,
      sellerAccountNumber: this.invoiceSettingsForm.value.sellerAccountNumber,
      buyerName: this.invoiceSettingsForm.value.buyerName,
      buyerAddressLine1: this.invoiceSettingsForm.value.buyerAddressLine1,
      buyerAddressLine2: this.invoiceSettingsForm.value.buyerAddressLine2,
      buyerPhone: this.invoiceSettingsForm.value.buyerPhone,
      buyerTaxId: this.invoiceSettingsForm.value.buyerTaxId,
      issuedBy: this.invoiceSettingsForm.value.issuedBy
    };

    this.saveInvoiceSettingsSubscription = this.dataStorageService.updateInvoiceSettings(newInvoiceSettings).subscribe(response => {
      this.settingsService.setSettings(newInvoiceSettings);
      this.finishedSaving = true;
    });
  }

  initInvoiceSettingsForm(): void {
    this.invoiceSettingsForm = new FormGroup({
      sellerName: new FormControl(this.userInvoiceSettings.sellerName, Validators.required),
      sellerAddressLine1: new FormControl(this.userInvoiceSettings.sellerAddressLine1, Validators.required),
      sellerAddressLine2: new FormControl(this.userInvoiceSettings.sellerAddressLine2, Validators.required),
      sellerTaxId: new FormControl(this.userInvoiceSettings.sellerTaxId, Validators.required),
      sellerEmail: new FormControl(this.userInvoiceSettings.sellerEmail),
      sellerBankName: new FormControl(this.userInvoiceSettings.sellerBankName, Validators.required),
      sellerAccountNumber: new FormControl(this.userInvoiceSettings.sellerAccountNumber, Validators.required),
      buyerName: new FormControl(this.userInvoiceSettings.buyerName, Validators.required),
      buyerAddressLine1: new FormControl(this.userInvoiceSettings.buyerAddressLine1, Validators.required),
      buyerAddressLine2: new FormControl(this.userInvoiceSettings.buyerAddressLine2, Validators.required),
      buyerPhone: new FormControl(this.userInvoiceSettings.buyerPhone),
      buyerTaxId: new FormControl(this.userInvoiceSettings.buyerTaxId, Validators.required),
      issuedBy: new FormControl(this.userInvoiceSettings.issuedBy, Validators.required),
    });
  }
}
