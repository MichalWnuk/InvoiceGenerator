import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Settings } from './settings.model';
import { SettingsService } from './settings.service';
import { SettingsItem } from './settingsItem.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  settingsForm: FormGroup;
  userSettings: Settings;
  settingsSubscription: Subscription;
  saveSettingsSubscription: Subscription;
  finishedSaving = false;

  constructor(private settingsService: SettingsService, private dataStorageService: DataStorageService) { }

  get controls(): AbstractControl[] {
    return (this.settingsForm.get('settings') as FormArray).controls;
  }

  get settingsSavedMessage(): string {
    return 'Settings were successfully saved.';
  }

  ngOnInit(): void {
    this.settingsSubscription =
      this.settingsService.settingsChanged.subscribe((sett: Settings) => { this.userSettings = sett; });
    this.userSettings = this.settingsService.getSettings();
    this.initSettingsForm();
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();

    if (this.saveSettingsSubscription) {
      this.saveSettingsSubscription.unsubscribe();
    }
  }

  private initSettingsForm(): void {
    const userSettings = new FormArray([]);

    if (this.userSettings?.settings) {
      for (const setting of this.userSettings.settings) {
        userSettings.push(
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

    this.settingsForm = new FormGroup({
      settings: userSettings
    });
  }

  onSubmit(): void {
    const settings: SettingsItem[] = [];
    this.settingsForm.value.settings.forEach(setting => {
      const settingsItem = new SettingsItem();
      settingsItem.rateAmount = setting.rateAmount;
      settingsItem.rateName = setting.rateName;
      settings.push(settingsItem);
    });

    this.saveSettingsSubscription = this.dataStorageService.updateSettings(settings).subscribe(response => {
      const newSettings: Settings = this.settingsService.parseResponseSettingsToSettings(settings);
      this.settingsService.setSettings(newSettings);
      this.finishedSaving = true;
    });
  }

  onFinishedSaving(): void {
    this.finishedSaving = false;
  }

}
