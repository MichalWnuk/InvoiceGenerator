import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Timesheet } from './timesheet.model';
import { TimesheetService } from './timesheet.service';

@Injectable({
    providedIn: 'root'
})
export class TimesheetResolver implements Resolve<Timesheet[]> {
    constructor(private dataStorageService: DataStorageService, private timesheetService: TimesheetService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Timesheet[]> | Timesheet[] {
        return this.dataStorageService.fetchUserTimesheets();
    }
}
