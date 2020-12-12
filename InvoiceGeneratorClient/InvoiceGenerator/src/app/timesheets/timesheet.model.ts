import { Row } from './row.model';

export class Timesheet {
    public id: number;
    public month: number;
    public year: number;
    public rows: Row[];
    public state: string;
    public invoiceNumber: string;
}