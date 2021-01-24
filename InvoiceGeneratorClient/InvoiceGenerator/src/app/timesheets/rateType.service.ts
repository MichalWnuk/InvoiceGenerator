import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RateType } from './rateType.model';

@Injectable()
export class RateTypeService {
    rowTypesChanged = new Subject<RateType[]>();
    private rateTypes: RateType[] = [
        {
            id: 1, name: 'Standard', type: 'STD'
        },
        {
            id: 2, name: 'Overtime', type: 'OVT'
        },
        {
            id: 3, name: 'Weekend', type: 'WKN'
        }
    ];

    constructor() { }

    getRateTypes(): RateType[] {
        return this.rateTypes.slice();
    }
}
