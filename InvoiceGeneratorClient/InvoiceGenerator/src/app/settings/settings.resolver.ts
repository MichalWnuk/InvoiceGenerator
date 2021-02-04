import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Settings } from './settings.model';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class SettingsResolver implements Resolve<Settings> {
    constructor(private dataStorageService: DataStorageService, private settingsService: SettingsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Settings> | Settings {
        return this.dataStorageService.fetchUserSettings();
    }
}
