import { NgModule } from '@angular/core';
import { InvoicesComponent } from './invoices.component';
import { SharedModule } from '../shared/shared.module';
import { InvoicesRoutingModule } from './invoices-routing.module';



@NgModule({
  declarations: [InvoicesComponent],
  imports: [
    SharedModule,
    InvoicesRoutingModule
  ]
})
export class InvoicesModule { }
