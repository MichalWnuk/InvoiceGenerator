import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SettingsComponent],
  imports: [
    SharedModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }
