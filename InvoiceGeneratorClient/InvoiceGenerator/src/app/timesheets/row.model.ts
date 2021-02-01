import { Day } from './day.model';
import { RateType } from './rateType.model';

export class Row {
    public id: number;
    public days: Day[];
    public rateTypeId: number;
    public timesheetId: number;
}
