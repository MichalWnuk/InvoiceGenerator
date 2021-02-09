import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { InvoiceSettingsComponent } from './invoiceSettings.component';
import { InvoiceSettingsResolver } from './invoiceSettings.resolver';

const routes: Routes = [
    {
        path: '', component: InvoiceSettingsComponent, canActivate: [AuthGuard], resolve: [InvoiceSettingsResolver]
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
export class InvoiceSettingsRoutingModule { }
