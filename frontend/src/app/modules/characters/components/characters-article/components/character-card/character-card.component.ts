import { ITemperament } from './../../../../models/temperament.model';
import { IMeasurements } from './../../../../models/measurements.model';
import { IColors } from './../../../../models/colors.model';
import { CharacterPreferences } from './../../../../models/character-preferences.model';
import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    SimpleChanges,
} from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { Character } from 'src/app/modules/characters/models/character.model';
import {
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CharactersService } from 'src/app/core/service/characters.service';
import * as tinycolor from 'tinycolor2';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { StatisticsService } from 'src/app/core/service/statistics.service';
import { CharacterForChange } from 'src/app/modules/characters/models/character-for-change.model';
import { insertDeleteInfo } from 'src/app/modules/shared/functions/insert-delete.info';

@Component({
    selector: 'app-character-card',
    templateUrl: './character-card.component.html',
    styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent extends BaseComponent implements OnInit {
    background = '';

    routeId: number | null = null;
    character: Character | null = null;

    themeColor1 = '';
    fontColor = '';

    preferences: CharacterPreferences[] = [];

    isUserLogged = false;

    form = new UntypedFormGroup({});

    editedKey: string | null = null;

    isNewChar = false;

    insertDeleteInfo = () =>
        insertDeleteInfo(this._toastrService, this._translate);

    constructor(
        private _charactersService: CharactersService,
        private _toastrService: ToastrService,
        private _translate: TranslateService,
        private _route: ActivatedRoute,
        private _authService: AuthService,
        private _statisticsService: StatisticsService,
        private _router: Router
    ) {
        super();
    }

    ngOnInit() {
        this._route.params.subscribe((route) => {
            this.routeId = +route.id;

            if (this.routeId === 0) {
                this.character = new Character();
                this.isNewChar = true;

                this.patchForm(null);
                this.editedKey = 'charName';
                this.form.markAllAsTouched();
            } else {
                this.getCharacterById();
            }
        });

        this.subscriptions$.add(
            this._authService.isUserLogged$.subscribe((isUserLogged) => {
                this.isUserLogged = isUserLogged;
            })
        );

        this.subscriptions$.add(
            this._charactersService.changeEmitted$.subscribe(() => {
                this.changed();
            })
        );
    }

    changed() {
        this.form = this._charactersService.form;

        this.saveCharacter();
    }

    patchForm(key: string | null) {
        this.editedKey = null;
        if (this.character && key) {
            const keys = Object.keys(this.character);
            if (keys.includes(key)) {
                this.editedKey = key;
            }
        }

        this.form = new UntypedFormGroup({});
        this._charactersService.form = this.form;
        for (const key in this.character) {
            if (Object.prototype.hasOwnProperty.call(this.character, key)) {
                const untypedChar = this.character as any;
                const element = untypedChar[key];

                if (key === 'colors' || key === 'temperament') {
                    for (const childKey in element) {
                        if (
                            Object.prototype.hasOwnProperty.call(
                                element,
                                childKey
                            )
                        ) {
                            const childElement = element[childKey];

                            this.form.addControl(
                                childKey,
                                new UntypedFormControl(childElement)
                            );

                            this.form.get(childKey)?.setValue(childElement);
                        }
                    }
                    continue;
                }
                if (key === 'measurements') {
                    for (const childKey in element) {
                        this.form.addControl(
                            `${childKey}Height`,
                            new UntypedFormControl(
                                this.character.measurements![childKey].height
                            )
                        );
                        this.form.addControl(
                            `${childKey}Weight`,
                            new UntypedFormControl(
                                this.character.measurements![childKey].weight
                            )
                        );
                    }
                }

                if (key === 'birthday' || key === 'death') {
                    const element = untypedChar[key];

                    const formControlValue = element ? new Date(element) : null;

                    this.form.addControl(
                        key,
                        new UntypedFormControl(formControlValue)
                    );
                    continue;
                }

                if (key === 'charName') {
                    const element = untypedChar[key];

                    this.form.addControl(
                        key,
                        new UntypedFormControl(element, Validators.required)
                    );
                    continue;
                }

                this.form.addControl(key, new UntypedFormControl(element));
            }
        }
    }

    saveCharacter() {
        if (!this.form.valid) {
            return;
        }
        const request = this.form.value;
        const colors: IColors = {
            eyeColor1: this.form.get('eyeColor1')?.value,
            eyeColor2: this.form.get('eyeColor2')?.value,
            themeColor1: this.form.get('themeColor1')?.value,
            themeColor2: this.form.get('themeColor2')?.value,
            themeColor3: this.form.get('themeColor3')?.value,
            hairColor: this.form.get('hairColor')?.value,
            skinColor: this.form.get('skinColor')?.value,
        };

        request.colors = colors;

        const measurements: IMeasurements = {
            babyHeight: this.form.get('babyHeight')?.value,
            childHeight: this.form.get('childHeight')?.value,
            teenHeight: this.form.get('teenHeight')?.value,
            adultHeight: this.form.get('adultHeight')?.value,
            babyWeight: this.form.get('babyWeight')?.value,
            childWeight: this.form.get('childWeight')?.value,
            teenWeight: this.form.get('teenWeight')?.value,
            adultWeight: this.form.get('adultWeight')?.value,
        };
        request.measurements = measurements;

        const temperament: ITemperament = {
            melancholic: this.form.get('melancholic')?.value,
            sanguine: this.form.get('sanguine')?.value,
            choleric: this.form.get('choleric')?.value,
            flegmatic: this.form.get('flegmatic')?.value,
        };

        request.temperament = temperament;

        const birthdayDate = new Date(request.birthday).getTime();
        request.birthday = isNaN(birthdayDate) ? 0 : birthdayDate;

        const deathDate = new Date(request.death).getTime();
        request.death = isNaN(deathDate) ? 0 : deathDate;

        this.subscriptions$.add(
            this._charactersService.upsertCharacter(request).subscribe(
                (id) => {
                    this._toastrService.success(
                        this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
                    );

                    if (this.isNewChar) {
                        this._router.navigate(['./char-cards', id]);
                        this.isNewChar = false;
                        return;
                    }
                    this.getCharacterById();
                },
                (err) => {
                    this._toastrService.error(
                        this._translate.instant('TOASTR_MESSAGE.ERROR')
                    );
                }
            )
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
            this._charactersService.getCharacterById(this.routeId).subscribe(
                (character) => {
                    this.character = new Character(character);

                    if (this.character.archived && !this.isUserLogged) {
                        this.returnToCharList();
                    }

                    document.title = `${this.character.charName ?? '?'} ${
                        this.character.charSurname ?? ''
                    }`;

                    this.background = character.colors!.themeColor1;
                    const themeColorForChar = tinycolor(
                        character?.colors?.themeColor1
                    );

                    this.themeColor1 =
                        '' +
                        (tinycolor(character?.colors?.themeColor1).isLight()
                            ? tinycolor(themeColorForChar)
                            : tinycolor(themeColorForChar).lighten(35));

                    let root = document.documentElement;
                    root.style.setProperty('--theme-color', this.themeColor1);

                    this.fontColor = tinycolor(this.themeColor1).isLight()
                        ? 'black'
                        : 'white';
                    this.patchForm(null);
                },
                () => {
                    this.returnToCharList();
                }
            );

            this._statisticsService
                .getPreferencesForCharacter(this.routeId)
                .subscribe((preferences) => {
                    this.preferences = preferences;
                });
        }
    }

    returnToCharList() {
        this._router.navigate(['./char-cards']);
    }

    changeStateOfChar() {
        if (this.routeId && this.character) {
            this.subscriptions$.add(
                this._charactersService
                    .patchCharacterState(
                        new CharacterForChange(
                            +this.routeId,
                            !this.character.archived
                        )
                    )
                    .subscribe(
                        (_) => {
                            this._toastrService.success(
                                this._translate.instant(
                                    'TOASTR_MESSAGE.SAVE_SUCCESS'
                                )
                            );
                            this.changed();
                            this.getCharacterById();
                        },
                        (err) => {
                            this._toastrService.error(
                                this._translate.instant('TOASTR_MESSAGE.ERROR')
                            );
                        }
                    )
            );
        }
    }

    deleteCharacter() {
        if (!this.routeId) {
            return;
        }

        this.subscriptions$.add(
            this._charactersService.deleteCharacter(this.routeId).subscribe(
                (_) => {
                    this._toastrService.success(
                        this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
                    );
                    this.returnToCharList();
                },
                (err) => {
                    this._toastrService.error(
                        this._translate.instant('TOASTR_MESSAGE.ERROR')
                    );
                }
            )
        );
    }

    onOutletLoaded(component: any) {
        component.character = this.character;
        component.preferences = this.preferences;
        component.isUserLogged = this.isUserLogged;
        component.isNewChar = this.isNewChar;
    }
}
