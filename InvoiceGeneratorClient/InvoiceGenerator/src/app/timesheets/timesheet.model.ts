import { Row } from './row.model';

export class Timesheet {
    public id: number;
    public date: Date;
    public rows: Row[];
    public state: string;
    public invoiceNumber: string;
}
