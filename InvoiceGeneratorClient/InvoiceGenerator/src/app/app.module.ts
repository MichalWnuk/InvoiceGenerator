import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { TimesheetsModule } from './timesheets/timesheets.module';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    TimesheetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
