import { NgModule } from '@angular/core';
import { RateSettingsComponent } from './rateSettings.component';
import { SharedModule } from '../shared/shared.module';
import { RateSettingsRoutingModule } from './rateSettings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [RateSettingsComponent],
  imports: [
    SharedModule,
    RateSettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RateSettingsModule { }
