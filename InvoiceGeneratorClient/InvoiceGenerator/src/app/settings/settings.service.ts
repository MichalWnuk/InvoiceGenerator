import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Settings } from './settings.model';
import * as clone from 'clone';
import { SettingsItem } from './settingsItem.model';

@Injectable()
export class SettingsService {
    settingsChanged = new Subject<Settings>();
    private settings: Settings;

    constructor() { }

    setSettings(settings: Settings): void {
        this.settings = settings;
        this.settingsChanged.next(this.getSettings());
    }

    getSettings(): Settings {
        const settings = clone(this.settings);
        return settings;
    }

    parseResponseSettingsToSettings(settings: SettingsItem[]): Settings {
        const output = new Settings();
        output.settings = [];

        settings.forEach(setting => {
            output.settings.push(setting);
        });

        return output;
    }
}
