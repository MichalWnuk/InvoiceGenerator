import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceSettingsComponent } from './invoiceSettings.component';
import { InvoiceSettingsRoutingModule } from './invoiceSettings-routing.module';



@NgModule({
  declarations: [InvoiceSettingsComponent],
  imports: [
    SharedModule,
    InvoiceSettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InvoiceSettingsModule { }
