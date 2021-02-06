import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { RateSettings } from './rateSettings.model';
import { RateSettingsService } from './rateSettings.service';
import { RateSettingsItem } from './rateSettingsItem.model';

@Component({
  selector: 'app-settings',
  templateUrl: './rateSettings.component.html',
  styleUrls: ['./rateSettings.component.css']
})
export class RateSettingsComponent implements OnInit, OnDestroy {
  rateSettingsForm: FormGroup;
  userRateSettings: RateSettings;
  rateSettingsSubscription: Subscription;
  saveRateSettingsSubscription: Subscription;
  finishedSaving = false;

  constructor(private settingsService: RateSettingsService, private dataStorageService: DataStorageService) { }

  get controls(): AbstractControl[] {
    return (this.rateSettingsForm.get('rateSettings') as FormArray).controls;
  }

  get settingsSavedMessage(): string {
    return 'Settings were successfully saved.';
  }

  ngOnInit(): void {
    this.rateSettingsSubscription =
      this.settingsService.rateSettingsChanged.subscribe((sett: RateSettings) => { this.userRateSettings = sett; });
    this.userRateSettings = this.settingsService.getSettings();
    this.initSettingsForm();
  }

  ngOnDestroy(): void {
    this.rateSettingsSubscription.unsubscribe();

    if (this.saveRateSettingsSubscription) {
      this.saveRateSettingsSubscription.unsubscribe();
    }
  }

  private initSettingsForm(): void {
    const userRateSettings = new FormArray([]);

    if (this.userRateSettings?.rateSettings) {
      for (const setting of this.userRateSettings.rateSettings) {
        userRateSettings.push(
          new FormGroup({
            rateAmount: new FormControl(setting.rateAmount, [
              Validators.required,
              Validators.min(0)
            ]),
            rateName: new FormControl(setting.rateName)
          })
        );
      }
    }

    this.rateSettingsForm = new FormGroup({
      rateSettings: userRateSettings
    });
  }

  onSubmit(): void {
    const settings: RateSettingsItem[] = [];
    this.rateSettingsForm.value.rateSettings.forEach(setting => {
      const settingsItem = new RateSettingsItem();
      settingsItem.rateAmount = setting.rateAmount;
      settingsItem.rateName = setting.rateName;
      settings.push(settingsItem);
    });

    this.saveRateSettingsSubscription = this.dataStorageService.updateRateSettings(settings).subscribe(response => {
      const newSettings: RateSettings = this.settingsService.parseResponseSettingsToSettings(settings);
      this.settingsService.setSettings(newSettings);
      this.finishedSaving = true;
    });
  }

  onFinishedSaving(): void {
    this.finishedSaving = false;
  }

}
