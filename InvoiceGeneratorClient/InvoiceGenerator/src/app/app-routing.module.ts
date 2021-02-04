import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

const appRoutes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'Timesheets', loadChildren: () => import('./timesheets/timesheets.module').then(m => m.TimesheetsModule) },
    { path: 'Invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule) },
    { path: 'Auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: 'Settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
