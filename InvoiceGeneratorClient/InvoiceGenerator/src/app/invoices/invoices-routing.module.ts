import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { InvoiceResolver } from './invoice.resolver';
import { InvoicesComponent } from './invoices.component';

const routes: Routes = [
  {
    path: '', component: InvoicesComponent, canActivate: [AuthGuard], resolve: [InvoiceResolver]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class InvoicesRoutingModule { }
