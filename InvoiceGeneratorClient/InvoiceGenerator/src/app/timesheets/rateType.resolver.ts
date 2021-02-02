import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { RateType } from './rateType.model';
import { RateTypeService } from './ratetype.service';

@Injectable({
    providedIn: 'root'
})
export class RateTypeResolver implements Resolve<RateType[]> {
    constructor(private dataStorageService: DataStorageService, private rateTypeService: RateTypeService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RateType[]> | RateType[] {
        const recipes = this.rateTypeService.getRateTypes();

        if (recipes.length === 0) {
            return this.dataStorageService.fetchRateTypes();
        }

        return recipes;
    }
}
