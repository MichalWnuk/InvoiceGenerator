import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SettingsComponent } from './settings.component';
import { SettingsResolver } from './settings.resolver';

const routes: Routes = [
    {
        path: '', component: SettingsComponent, canActivate: [AuthGuard], resolve: [SettingsResolver]
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
export class SettingsRoutingModule { }
