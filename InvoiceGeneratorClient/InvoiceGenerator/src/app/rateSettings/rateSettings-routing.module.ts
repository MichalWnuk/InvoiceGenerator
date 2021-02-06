import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RateSettingsComponent } from './rateSettings.component';
import { RateSettingsResolver } from './rateSettings.resolver';

const routes: Routes = [
    {
        path: '', component: RateSettingsComponent, canActivate: [AuthGuard], resolve: [RateSettingsResolver]
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class RateSettingsRoutingModule { }
