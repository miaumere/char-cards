import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { IEditPreference } from 'src/app/modules/admin-panel/models/preferences/edit-preferences.model';
import { AllPreferences } from 'src/app/modules/characters/models/all-preferences.model';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { CharacterPreferences } from 'src/app/modules/characters/models/character-preferences.model';
import { IPreferenceTypes } from 'src/app/modules/characters/models/preference-type.model';
import { preferenceTypes } from '../../../../preference-types';

@Component({
    selector: 'app-preferences [preferences] [bgColor] [charId]',
    templateUrl: './preferences.component.html',
    styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent extends BaseComponent implements OnInit {
    readonly preferencesTypes = [
        {
            preferenceType: 'love',
            preferenceName: this._translate.instant('PREFERENCES.LOVE'),
            preferenceMin: 90,
            preferenceMax: 100,
        },
        {
            preferenceType: 'admiration',
            preferenceName: this._translate.instant('PREFERENCES.ADMIRATION'),
            preferenceMin: 75,
            preferenceMax: 90,
        },
        {
            preferenceType: 'sympathy',
            preferenceName: this._translate.instant('PREFERENCES.SYMPATHY'),
            preferenceMin: 60,
            preferenceMax: 75,
        },
        {
            preferenceType: 'neutral',
            preferenceName: this._translate.instant('PREFERENCES.NEUTRAL'),
            preferenceMin: 45,
            preferenceMax: 60,
        },
        {
            preferenceType: 'conflict',
            preferenceName: this._translate.instant('PREFERENCES.CONFLICT'),
            preferenceMin: 30,
            preferenceMax: 45,
        },
        {
            preferenceType: 'enemy',
            preferenceName: this._translate.instant('PREFERENCES.ENEMY'),
            preferenceMin: 15,
            preferenceMax: 30,
        },
        {
            preferenceType: 'hatred',
            preferenceName: this._translate.instant('PREFERENCES.HATRED'),
            preferenceMin: 0,
            preferenceMax: 15,
        },
    ];

    @Input('preferences') characterCurrentPreferences: CharacterPreferences[] =
        [];
    @Input() readonly bgColor: string = '';
    @Input()
    readonly charId: number = 0;

    @Output() preferencesChangedEvent = new EventEmitter();

    chosenType?: string = '';

    preferences: AllPreferences[] = [];

    charList: CharacterItem[] = [];
    filteredCharList: CharacterItem[] = [];

    preferencesForm = new FormGroup({
        range: new FormControl(0),
        character: new FormControl(null, Validators.required),
        date: new FormControl(),
    });

    selectedCharacter?: CharacterItem;

    date: Date | null = null;

    isPrefLegendVisible = false;
    expandPreferences = false;

    constructor(
        private _charactersService: CharactersService,
        private _toastrService: ToastrService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit() {
        this.getCharactersList();
        this.getAllPreferences();

        this.preferencesForm
            .get('character')
            ?.valueChanges.subscribe((value) => {
                this._filterCharacters(value);
            });
    }

    private _filterCharacters(value: string) {
        if (!value) {
            this.filteredCharList = this.charList;
            return;
        }
        const regex = new RegExp(value, 'gi');

        const filteredChars = this.filteredCharList.filter((c) => {
            if (c.pseudonym) {
                return c.fullName.match(regex) || c.pseudonym.match(regex);
            }
            return c.fullName.match(regex);
        });

        this.filteredCharList = filteredChars;
    }

    chosenMonthHandler(date: Date, datepicker: MatDatepicker<any>) {
        this.preferencesForm.get('date')?.setValue(date);
        this.date = date;

        datepicker.close();
    }

    clearStartDate() {
        this.date = null;
        this.preferencesForm.get('date')?.setValue(null);
    }

    setRangeValue(value: number) {
        const matchingType = this.preferencesTypes.find(
            (t) => t.preferenceMax >= value && t.preferenceMin <= value
        );
        this.chosenType = matchingType?.preferenceType;
    }

    addPreference() {
        if (!this.preferencesForm.valid) {
            this.preferencesForm.markAllAsTouched();
            return;
        }

        const objToSend: IEditPreference = {
            characterId: this.charId,
            preferedCharacterId:
                this.preferencesForm.get('character')?.value.id,
            range: this.preferencesForm.get('range')?.value,
            date: this.preferencesForm.get('date')?.value,
        };

        this._charactersService.postEditPreferences(objToSend).subscribe(
            (_) => {
                this._toastrService.success(
                    this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
                );
                this.preferencesForm.reset();
                this.getAllPreferences();
                this.preferencesChangedEvent.emit();
            },
            (err) => {
                this._toastrService.error(
                    this._translate.instant('TOASTR_MESSAGE.ERROR')
                );
            }
        );
    }

    private getCharactersList() {
        this.subscriptions$.add(
            this._charactersService.getCharacters().subscribe((charList) => {
                const listWithoutMainCharacter = (
                    charList as CharacterItem[]
                ).filter((x) => x.id !== this.charId);
                this.charList = listWithoutMainCharacter;
                this.filteredCharList = listWithoutMainCharacter;
            })
        );
    }

    getProfilePicForCharacter(id: number) {
        return this.charList.find((char) => char.id === id)?.profilePic;
    }

    getAllPreferences() {
        this.subscriptions$.add(
            this._charactersService
                .getAllPreferencesForChar(this.charId)
                .subscribe((preferences) => {
                    this.preferences = preferences;
                })
        );
    }

    insertDeleteInfo() {
        this._toastrService.warning(
            this._translate.instant('TOASTR_MESSAGE.DELETE_INFO')
        );
    }

    deletePreference(id: number) {
        this.subscriptions$.add(
            this._charactersService.deletePreference(id).subscribe(
                (_) => {
                    this._toastrService.success(
                        this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
                    );
                    this.getAllPreferences();

                    this.preferencesChangedEvent.emit();
                },
                (err) => {
                    this._toastrService.error(
                        this._translate.instant('TOASTR_MESSAGE.ERROR')
                    );
                }
            )
        );
    }

    getPreferenceTypeForRange(range: number) {
        return this.preferencesTypes.find((type) => type.preferenceMin < range)
            ?.preferenceType;
    }
}
