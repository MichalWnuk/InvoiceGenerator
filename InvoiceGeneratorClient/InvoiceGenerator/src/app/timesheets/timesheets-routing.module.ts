import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { TimesheetsComponent } from './timesheets.component';

const routes: Routes = [
    {
        path: '', component: TimesheetsComponent, children: [
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TimesheetsRoutingModule { }