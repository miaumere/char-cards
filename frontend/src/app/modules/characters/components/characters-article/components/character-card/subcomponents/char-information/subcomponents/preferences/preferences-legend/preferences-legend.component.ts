import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IPreferenceTypes } from 'src/app/modules/characters/models/preference-type.model';
import { preferenceTypes } from '../../../../../preference-types';

@Component({
    selector: 'app-preferences-legend',
    templateUrl: './preferences-legend.component.html',
    styleUrls: ['./preferences-legend.component.scss'],
})
export class PreferencesLegendComponent implements OnInit {
    readonly preferenceTypes: IPreferenceTypes[] = preferenceTypes;

    constructor() {}

    ngOnInit(): void {}
}
