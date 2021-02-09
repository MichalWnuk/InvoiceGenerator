import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { RateSettings } from './rateSettings.model';
import { RateSettingsService } from './rateSettings.service';

@Injectable({
    providedIn: 'root'
})
export class RateSettingsResolver implements Resolve<RateSettings> {
    constructor(private dataStorageService: DataStorageService, private settingsService: RateSettingsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RateSettings> | RateSettings {
        return this.dataStorageService.fetchUserRateSettings();
    }
}
