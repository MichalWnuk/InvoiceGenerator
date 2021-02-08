import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Invoice } from './invoice.model';
import { InvoiceService } from './invoice.service';

@Injectable({
    providedIn: 'root'
})
export class InvoiceResolver implements Resolve<Invoice[]> {
    constructor(private dataStorageService: DataStorageService, private invoiceService: InvoiceService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Invoice[]> | Invoice[] {
        return this.dataStorageService.fetchUserInvoices();
    }
}
