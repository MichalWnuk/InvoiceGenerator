import { NgModule } from '@angular/core';
import { InvoicesComponent } from './invoices.component';
import { SharedModule } from '../shared/shared.module';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [InvoicesComponent, InvoiceListComponent, InvoiceAddComponent],
  imports: [
    SharedModule,
    InvoicesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InvoicesModule { }
