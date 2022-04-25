import { Component, Input, OnInit } from '@angular/core';
import { CharacterPreferences } from 'src/app/modules/characters/models/character-preferences.model';
import { IPreferenceTypes } from 'src/app/modules/characters/models/preference-type.model';
import { preferenceTypes } from '../../preference-types';

@Component({
    selector: 'app-preferences [preferences] [bgColor]',
    templateUrl: './preferences.component.html',
    styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent implements OnInit {
    @Input() readonly preferences: CharacterPreferences[] = [];
    @Input() readonly bgColor: string = '';

    readonly preferenceTypes: IPreferenceTypes[] = preferenceTypes;

    isPrefLegendVisible = false;

    constructor() {}

    ngOnInit() {}
}
