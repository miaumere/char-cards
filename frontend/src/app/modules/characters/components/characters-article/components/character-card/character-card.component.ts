import { preferenceTypes } from './preference-types';
import { CharacterPreferences } from './../../../../models/character-preferences.model';
import { StatisticsService } from 'src/app/core/service/statistics.service';
import { CountriesService } from 'src/app/core/service/countries.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { Character } from 'src/app/modules/characters/models/character.model';
import { CharactersService } from 'src/app/core/service/characters.service';
import { ActivatedRoute } from '@angular/router';
import * as tinycolor from 'tinycolor2';
import { Measurements } from 'src/app/modules/characters/models/measurements.model';

@Component({
    selector: 'app-character-card',
    templateUrl: './character-card.component.html',
    styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent extends BaseComponent implements OnInit {
    @Output() bgColorFromChild = new EventEmitter<string>();

    routeId: number | null = null;
    character: Character | null = null;

    themeColor1 = '';
    bgColor1 = '';
    bgColor2 = '';

    preferences: CharacterPreferences[] = [];

    constructor(
        private _charactersService: CharactersService,
        private _statisticsService: StatisticsService,
        private _route: ActivatedRoute
    ) {
        super();
    }

    ngOnInit() {
        this._route.params.subscribe((route) => {
            this.routeId = route.id;
            this.getCharacterById();
        });
    }

    getCharacterById() {
        this.character = null;

        if (this.routeId !== null) {
            this._charactersService
                .getCharacterById(this.routeId)
                .subscribe((character) => {
                    this.character = new Character(character);

                    this.character.measurements = character.measurements
                        ? new Measurements(character.measurements)
                        : null;

                    this.bgColorFromChild.emit(character.colors!.themeColor1);
                    const themeColorForChar = tinycolor(
                        character?.colors?.themeColor1
                    );
                    const bgColorForChar = tinycolor(
                        character?.colors?.themeColor2
                    );
                    const darkerBgColorForChar = tinycolor(
                        character?.colors?.themeColor2
                    );

                    this.bgColor1 =
                        '' +
                        tinycolor(bgColorForChar).darken(15).desaturate(10);
                    this.bgColor2 =
                        '' +
                        tinycolor(darkerBgColorForChar)
                            .darken(25)
                            .desaturate(30);

                    if (themeColorForChar.isLight()) {
                        this.themeColor1 =
                            '' + tinycolor(themeColorForChar).darken(15);
                    } else {
                        this.themeColor1 =
                            '' + tinycolor(themeColorForChar).lighten(35);
                    }
                });

            this._statisticsService
                .getPreferencesForCharacter(this.routeId)
                .subscribe((preferences) => {
                    this.preferences = preferences;
                });
        }
    }
}
