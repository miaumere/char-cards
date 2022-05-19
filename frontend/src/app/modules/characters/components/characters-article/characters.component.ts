import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/base.component';
import { AuthService } from 'src/app/core/service/auth.service';
import { CharactersService } from 'src/app/core/service/characters.service';
import { StatisticsService } from 'src/app/core/service/statistics.service';
import * as tinycolor from 'tinycolor2';
import { CharacterPreferences } from '../../models/character-preferences.model';
import { Character } from '../../models/character.model';
import { Measurements } from '../../models/measurements.model';

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent extends BaseComponent implements OnInit {
    background = '';

    routeId: number | null = null;
    character: Character | null = null;

    themeColor1 = '';
    bgColor1 = '';
    bgColor2 = '';

    preferences: CharacterPreferences[] = [];

    isUserLogged = false;

    constructor(
        private _charactersService: CharactersService,
        private _statisticsService: StatisticsService,
        private _route: ActivatedRoute,
        private _authService: AuthService
    ) {
        super();
    }

    ngOnInit() {
        this._route.params.subscribe((route) => {
            this.routeId = route.id;
            this.getCharacterById();
        });

        this.subscriptions$.add(
            this._authService.isUserLogged$.subscribe((isUserLogged) => {
                this.isUserLogged = isUserLogged;
            })
        );
    }
    bgColorFromChild(bgColor: string) {
        this.background =
            '' + tinycolor(this.background).darken(20).desaturate(25);

        this.background = bgColor ? bgColor : 'grey';
    }

    getCharacterById() {
        this.character = null;

        if (this.routeId !== null) {
            this._charactersService
                .getCharacterById(this.routeId)
                .subscribe((character) => {
                    this.character = new Character(character);

                    document.title = `${this.character.charName} ${this.character.charSurname}`;

                    this.character.measurements = character.measurements
                        ? new Measurements(character.measurements)
                        : null;

                    this.background = character.colors!.themeColor1;
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
                        (tinycolor(bgColorForChar).isDark()
                            ? tinycolor(bgColorForChar)
                                  .darken(15)
                                  .desaturate(10)
                            : tinycolor(bgColorForChar)
                                  .darken(35)
                                  .desaturate(50));

                    this.bgColor2 =
                        '' +
                        (themeColorForChar.isLight()
                            ? tinycolor(themeColorForChar)
                                  .darken(55)
                                  .desaturate(30)
                            : tinycolor(themeColorForChar)
                                  .darken(25)
                                  .desaturate(30));

                    this.themeColor1 =
                        '' +
                        (themeColorForChar.isLight()
                            ? tinycolor(themeColorForChar).darken(15)
                            : tinycolor(themeColorForChar).lighten(35));
                });

            this._statisticsService
                .getPreferencesForCharacter(this.routeId)
                .subscribe((preferences) => {
                    this.preferences = preferences;
                });
        }
    }
}
