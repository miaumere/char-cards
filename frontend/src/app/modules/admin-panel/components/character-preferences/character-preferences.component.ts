import { AllPreferences } from './../../../characters/models/all-preferences.model';
import { IEditPreference } from './../../models/preferences/edit-preferences.model';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CharactersService } from 'src/app/core/service/characters.service';
import { Component, OnInit, } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { startWith, map } from 'rxjs/operators';
import { MatDatepicker } from '@angular/material';

@Component({
  selector: 'app-character-preferences',
  templateUrl: './character-preferences.component.html',
  styleUrls: ['./character-preferences.component.scss']
})

export class CharacterPreferencesComponent extends BaseComponent implements OnInit {
  readonly preferencesTypes = [
    {
      preferenceType: 'love',
      preferenceName: this._translate.instant('PREFERENCES.LOVE'),
      preferenceMin: 90,
      preferenceMax: 100
    },
    {
      preferenceType: 'admiration',
      preferenceName: this._translate.instant('PREFERENCES.ADMIRATION'),
      preferenceMin: 75,
      preferenceMax: 90
    },
    {
      preferenceType: 'sympathy',
      preferenceName: this._translate.instant('PREFERENCES.SYMPATHY'),
      preferenceMin: 60,
      preferenceMax: 75
    },
    {
      preferenceType: 'neutral',
      preferenceName: this._translate.instant('PREFERENCES.NEUTRAL'),
      preferenceMin: 45,
      preferenceMax: 60
    },
    {
      preferenceType: 'conflict',
      preferenceName: this._translate.instant('PREFERENCES.CONFLICT'),
      preferenceMin: 30,
      preferenceMax: 45
    },
    {
      preferenceType: 'enemy',
      preferenceName: this._translate.instant('PREFERENCES.ENEMY'),
      preferenceMin: 15,
      preferenceMax: 30
    },
    {
      preferenceType: 'hatred',
      preferenceName: this._translate.instant('PREFERENCES.HATRED'),
      preferenceMin: 0,
      preferenceMax: 15
    }
  ];

  chosenType?: string;

  preferences: AllPreferences[] = [];

  charId: number;

  charList: CharacterItem[] = [];


  preferencesForm = new FormGroup({
    range: new FormControl(0),
    character: new FormControl(''),
    date: new FormControl()
  });

  filteredCharacters = new Observable<CharacterItem[]>();
  selectedCharacter?: CharacterItem;

  date;

  constructor(
    private _charactersService: CharactersService,
    private _activatedRoute: ActivatedRoute,
    private _toastrService: ToastrService,
    private _translate: TranslateService
  ) { super(); }

  ngOnInit() {

    this._activatedRoute?.parent?.queryParams
      .subscribe(queryParam => {
        this.charId = +queryParam.id;
      });

    this.getCharactersList();
    this.getAllPreferences();
  }
  private _filterCharacters(value: string) {
    const filterValue = value.toLowerCase();

    return this.charList.filter(c => `${c.charName} ${c.charSurname}`.toLowerCase().indexOf(filterValue) === 0);
  }

  chosenMonthHandler(date: Date, datepicker: MatDatepicker<any>) {
    this.preferencesForm.get('date')?.setValue(date)
    this.date = date;

    datepicker.close();
  }

  setRangeValue(value: number) {
    const matchingType = this.preferencesTypes.find(t => t.preferenceMax >= value && t.preferenceMin <= value)
    this.chosenType = matchingType?.preferenceType;
  }


  addPreference() {
    const foundChar = this.charList
      .find(c => `${c.charName} ${c.charSurname}`.toLowerCase() === this.preferencesForm.get('character')?.value.toLowerCase());

    if (foundChar) {
      const objToSend: IEditPreference = {
        characterId: this.charId,
        preferedCharacterId: foundChar.id,
        range: this.preferencesForm.get('range')?.value,
        date: this.preferencesForm.get('date')?.value
      }

      console.log(objToSend);

      this._charactersService
        .postEditPreferences(objToSend)
        .subscribe(_ => {
          this._toastrService.success(this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS'));
          this.preferencesForm.reset();
          this.getAllPreferences();

        },
          err => {
            this._toastrService.error(this._translate.instant('TOASTR_MESSAGE.ERROR'))
          }
        )
    }

  }

  getCharactersList() {

    this.subscriptions$.add(
      this._charactersService
        .getCharacters()
        .subscribe(charList => {
          this.charList = charList;

          this.filteredCharacters = this.preferencesForm.controls['character'].valueChanges
            .pipe(
              startWith(''),
              map(character => character ? this._filterCharacters(character) : this.charList)
            );
        })
    );
  }

  getAllPreferences() {
    this.subscriptions$.add(
      this._charactersService
        .getAllPreferencesForChar(this.charId)
        .subscribe(preferences => {
          this.preferences = preferences;
        })
    )
  }

  deletePreference(id: number) {

    this.subscriptions$.add(
      this._charactersService
        .deletePreference(id)
        .subscribe(_ => {
          this._toastrService.success(this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS'));
          this.getAllPreferences();
        }, err => {
          this._toastrService.error(this._translate.instant('TOASTR_MESSAGE.ERROR'));
        })
    )
  }
}
