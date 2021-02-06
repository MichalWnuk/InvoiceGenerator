import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RateSettings } from './rateSettings.model';
import * as clone from 'clone';
import { RateSettingsItem } from './rateSettingsItem.model';

@Injectable()
export class RateSettingsService {
    rateSettingsChanged = new Subject<RateSettings>();
    private rateSettings: RateSettings;

    constructor() { }

    setSettings(settings: RateSettings): void {
        this.rateSettings = settings;
        this.rateSettingsChanged.next(this.getSettings());
    }

    getSettings(): RateSettings {
        const rateSettings = clone(this.rateSettings);
        return rateSettings;
    }

    parseResponseSettingsToSettings(rateSettings: RateSettingsItem[]): RateSettings {
        const output = new RateSettings();
        output.rateSettings = [];

        rateSettings.forEach(setting => {
            output.rateSettings.push(setting);
        });

        return output;
    }
}
