import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RateType } from './rateType.model';

@Injectable()
export class RateTypeService {
    rateTypesChanged = new Subject<RateType[]>();
    private rateTypes: RateType[] = [];

    constructor() { }

    setRateTypes(rateTypes: RateType[]): void {
        this.rateTypes = rateTypes;
        this.rateTypesChanged.next(this.getRateTypes());
    }

    getRateTypes(): RateType[] {
        return this.rateTypes.slice();
    }

    getRateTypeDisplayName(id: number): string {
        return this.rateTypes.find(type => type.id === id).displayName;
    }
}
