import { TranslateService } from '@ngx-translate/core';
import { IMeasurements } from 'src/app/modules/characters/models/measurements.model';
import { Measurements } from './../../../characters/models/measurements.model';
import { Temperament } from './../../../characters/models/temperament.model';
import { EditCharacter } from './../../models/edit-character.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CharactersService } from 'src/app/core/service/characters.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/base.component';
import { Colors } from 'src/app/modules/characters/models/colors.model';
import { finalize } from 'rxjs/operators';
import { Gender } from '../../enums/gender.enum';
import { CharType } from '../../enums/character-type.enum';
import { CreateCharacter } from '../../models/create-character.model';
import { CountriesService } from 'src/app/core/service/countries.service';
import { Country } from '../../models/countries/country.model';

type chooseFormType = 'SUBMIT' | number;
@Component({
    selector: 'app-character-modify',
    templateUrl: './character-modify.component.html',
    styleUrls: ['./character-modify.component.scss'],
})
export class CharacterModifyComponent extends BaseComponent implements OnInit {
    readonly Gender = Gender;
    readonly CharType = CharType;

    formParts: string[] = [];

    isDead = false;

    personalInfoForm = new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),

        gender: new FormControl(
            Gender[Gender.UNKNOWNGENDER],
            Validators.required
        ),
    });

    addidionalPersonalInfoForm = new FormGroup({
        birthday: new FormControl(''),
        profession: new FormControl(''),
        pseudonim: new FormControl(''),
        death: new FormControl(),
        deathReason: new FormControl(''),
        nationality: new FormControl(''),
    });

    temperamentForm = new FormGroup({
        melancholic: new FormControl(0),
        sanguine: new FormControl(0),
        flegmatic: new FormControl(0),
        choleric: new FormControl(0),
    });

    colorForm = new FormGroup({
        themeColor1: new FormControl('#C1C1C1'),
        themeColor2: new FormControl('#828282'),
        themeColor3: new FormControl('#414141'),

        eyeColor1: new FormControl('#8A8E91'),
        eyeColor2: new FormControl('#CBCBCB'),
        hairColor: new FormControl('#4E4E4E'),
        skinColor: new FormControl('#FFE6D8'),
    });

    measurementsForm = new FormGroup({
        babyWeight: new FormControl(50, [
            Validators.min(1),
            Validators.max(100),
        ]),
        childWeight: new FormControl(50, [
            Validators.min(1),
            Validators.max(100),
        ]),
        teenWeight: new FormControl(50, [
            Validators.min(1),
            Validators.max(100),
        ]),
        adultWeight: new FormControl(50, [
            Validators.min(1),
            Validators.max(100),
        ]),

        babyHeight: new FormControl(100, [
            Validators.min(30),
            Validators.max(200),
        ]),
        childHeight: new FormControl(100, [
            Validators.min(30),
            Validators.max(200),
        ]),
        teenHeight: new FormControl(100, [
            Validators.min(30),
            Validators.max(200),
        ]),
        adultHeight: new FormControl(100, [
            Validators.min(30),
            Validators.max(200),
        ]),
    });

    newCharacterForm = new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),

        birthday: new FormControl('', Validators.required),
        profession: new FormControl(''),
        death: new FormControl(''),
        deathReason: new FormControl(''),
        gender: new FormControl('', Validators.required),

        melancholic: new FormControl(0),
        sanguine: new FormControl(0),
        flegmatic: new FormControl(0),
        choleric: new FormControl(0),

        themeColor1: new FormControl('#C1C1C1'),
        themeColor2: new FormControl('#828282'),
        themeColor3: new FormControl('#414141'),

        eyeColor1: new FormControl('#8A8E91'),
        eyeColor2: new FormControl('#CBCBCB'),
        hairColor: new FormControl('#4E4E4E'),
        skinColor: new FormControl('#FFE6D8'),

        babyWeight: new FormControl(0),
        childWeight: new FormControl(0),
        teenWeight: new FormControl(0),
        adultWeight: new FormControl(0),

        babyHeight: new FormControl(100),
        childHeight: new FormControl(100),
        teenHeight: new FormControl(100),
        adultHeight: new FormControl(100),
    });
    editCharacterForm = new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),

        birthday: new FormControl(''),
        profession: new FormControl(''),
        death: new FormControl(''),
        deathReason: new FormControl(''),
        gender: new FormControl('', Validators.required),

        melancholic: new FormControl(0),
        sanguine: new FormControl(0),
        flegmatic: new FormControl(0),
        choleric: new FormControl(0),

        themeColor1: new FormControl('#C1C1C1'),
        themeColor2: new FormControl('#828282'),
        themeColor3: new FormControl('#414141'),

        eyeColor1: new FormControl('#8A8E91'),
        eyeColor2: new FormControl('#CBCBCB'),
        hairColor: new FormControl('#4E4E4E'),
        skinColor: new FormControl('#FFE6D8'),

        babyWeight: new FormControl(0),
        childWeight: new FormControl(0),
        teenWeight: new FormControl(0),
        adultWeight: new FormControl(0),

        babyHeight: new FormControl(100),
        childHeight: new FormControl(100),
        teenHeight: new FormControl(100),
        adultHeight: new FormControl(100),
    });
    melancholicValue = 0;
    sanguineValue = 0;
    flegmaticValue = 0;
    cholericValue = 0;

    measurements: IMeasurements | null = null;

    birthdayDate: string | null = '';
    deathDate: string | null = '';

    profilePic: File | null = null;
    images: FileList | null = null;

    type: 'new' | 'edit' = 'new';

    charId: number = 0;

    countries: Country[] = [];

    constructor(
        private _toastrService: ToastrService,
        private _charactersService: CharactersService,
        private _route: Router,
        private _activatedRoute: ActivatedRoute,
        private _countriesService: CountriesService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit() {
        this.setModifyType();
        this.getCountriesList();
    }

    getCountriesList() {
        this.subscriptions$.add(
            this._countriesService.getCountries().subscribe((countries) => {
                this.countries = countries;
            })
        );
    }

    setModifyType() {
        this._activatedRoute?.parent?.queryParams.subscribe((queryParam) => {
            this.charId = +queryParam.id;
        });

        if (this._activatedRoute?.parent?.params) {
            this.subscriptions$.add(
                this._activatedRoute.params.subscribe((param) => {
                    this.type = param.type;
                    switch (param.type) {
                        case 'new':
                            const deathReason =
                                this.addidionalPersonalInfoForm.controls[
                                    'deathReason'
                                ];
                            const death =
                                this.addidionalPersonalInfoForm.controls[
                                    'death'
                                ];
                            deathReason.disable();
                            death.disable();
                            break;

                        case 'edit':
                            this.getCharacterDetails();

                            break;
                    }
                })
            );
        }
    }

    getCharacterDetails() {
        this.subscriptions$.add(
            this._charactersService
                .getCharacterDetails(this.charId)
                .subscribe((charDetails) => {
                    this.measurements = charDetails.measurements;

                    this.birthdayDate = '' + charDetails.birthday;
                    this.deathDate = '' + charDetails.death;

                    this.personalInfoForm
                        .get('name')
                        ?.setValue(charDetails.charName);
                    this.personalInfoForm
                        .get('surname')
                        ?.setValue(charDetails.charSurname);
                    this.personalInfoForm
                        .get('gender')
                        ?.setValue(charDetails.gender);

                    this.addidionalPersonalInfoForm
                        .get('pseudonim')
                        ?.setValue(charDetails.pseudonim);
                    this.addidionalPersonalInfoForm
                        .get('profession')
                        ?.setValue(charDetails.occupation);
                    this.addidionalPersonalInfoForm
                        .get('deathReason')
                        ?.setValue(charDetails.deathReason);
                    this.addidionalPersonalInfoForm
                        .get('nationality')
                        ?.setValue(charDetails.nationality);

                    this.colorForm
                        .get('themeColor1')
                        ?.setValue(charDetails.colors?.themeColor1);
                    this.colorForm
                        .get('themeColor2')
                        ?.setValue(charDetails.colors?.themeColor2);
                    this.colorForm
                        .get('themeColor3')
                        ?.setValue(charDetails.colors?.themeColor3);
                    this.colorForm
                        .get('eyeColor1')
                        ?.setValue(charDetails.colors?.eyeColor1);
                    this.colorForm
                        .get('eyeColor2')
                        ?.setValue(charDetails.colors?.eyeColor2);
                    this.colorForm
                        .get('hairColor')
                        ?.setValue(charDetails.colors?.hairColor);
                    this.colorForm
                        .get('skinColor')
                        ?.setValue(charDetails.colors?.skinColor);

                    this.temperamentForm
                        .get('melancholic')
                        ?.setValue(charDetails.temperament?.melancholic);
                    this.temperamentForm
                        .get('flegmatic')
                        ?.setValue(charDetails.temperament?.flegmatic);
                    this.temperamentForm
                        .get('sanguine')
                        ?.setValue(charDetails.temperament?.sanguine);
                    this.temperamentForm
                        .get('choleric')
                        ?.setValue(charDetails.temperament?.choleric);

                    this.measurementsForm
                        .get('babyHeight')
                        ?.setValue(charDetails.measurements?.babyHeight);
                    this.measurementsForm
                        .get('babyWeight')
                        ?.setValue(charDetails.measurements?.babyWeight);
                    this.measurementsForm
                        .get('childHeight')
                        ?.setValue(charDetails.measurements?.childHeight);
                    this.measurementsForm
                        .get('childWeight')
                        ?.setValue(charDetails.measurements?.childWeight);
                    this.measurementsForm
                        .get('teenHeight')
                        ?.setValue(charDetails.measurements?.teenHeight);
                    this.measurementsForm
                        .get('teenWeight')
                        ?.setValue(charDetails.measurements?.teenWeight);
                    this.measurementsForm
                        .get('adultHeight')
                        ?.setValue(charDetails.measurements?.adultHeight);
                    this.measurementsForm
                        .get('adultWeight')
                        ?.setValue(charDetails.measurements?.adultWeight);
                })
        );
    }

    toggleIsDead() {
        const deathReason =
            this.addidionalPersonalInfoForm.controls['deathReason'];
        const death = this.addidionalPersonalInfoForm.controls['death'];

        if (this.isDead) {
            this.isDead = false;
            deathReason.disable();
            death.disable();
        } else {
            this.isDead = true;
            death.enable();
            deathReason.enable();
        }
    }

    submit() {
        let character;

        switch (this.type) {
            case 'new':
                character = new CreateCharacter();
                break;

            case 'edit':
                character = new EditCharacter();
                character.externalId = +this.charId;
                break;
        }
        character.charName = this.personalInfoForm.controls['name']?.value;
        character.charSurname =
            this.personalInfoForm.controls['surname']?.value;
        character.gender = this.personalInfoForm.controls['gender']?.value;

        const birthday =
            this.addidionalPersonalInfoForm.controls['birthday']?.value;
        const birthdayDate = new Date(birthday).getTime();
        isNaN(birthdayDate)
            ? (character.birthday = 0)
            : (character.birthday = birthdayDate);

        if (this.isDead) {
            const death =
                this.addidionalPersonalInfoForm.controls['death']?.value;
            const deathDate = new Date(death).getTime();
            isNaN(deathDate)
                ? (character.death = null)
                : (character.death = deathDate);
            character.deathReason =
                this.addidionalPersonalInfoForm.controls['deathReason']?.value;
        } else {
            character.death = null;
            character.deathReason = null;
        }
        character.occupation =
            this.addidionalPersonalInfoForm.controls['profession']?.value;
        character.pseudonim =
            this.addidionalPersonalInfoForm.controls['pseudonim']?.value;
        character.nationality =
            this.addidionalPersonalInfoForm.controls['nationality']?.value;

        const colors = new Colors();
        colors.themeColor1 = this.colorForm.controls['themeColor1']?.value;
        colors.themeColor2 = this.colorForm.controls['themeColor2']?.value;
        colors.themeColor3 = this.colorForm.controls['themeColor3']?.value;
        colors.eyeColor1 = this.colorForm.controls['eyeColor1']?.value;
        colors.eyeColor2 = this.colorForm.controls['eyeColor2']?.value;
        colors.hairColor = this.colorForm.controls['hairColor']?.value;
        colors.skinColor = this.colorForm.controls['skinColor']?.value;

        character.colors = colors;

        const temperament = new Temperament(
            this.temperamentForm.controls['choleric']?.value,
            this.temperamentForm.controls['flegmatic']?.value,
            this.temperamentForm.controls['melancholic']?.value,
            this.temperamentForm.controls['sanguine']?.value
        );

        character.temperament = temperament;
        const measurements = this.measurements
            ? new Measurements(this.measurements)
            : null;

        if (measurements) {
            measurements.babyHeight =
                this.measurementsForm.controls['babyHeight']?.value;
            measurements.babyWeight =
                this.measurementsForm.controls['babyWeight']?.value;
            measurements.childHeight =
                this.measurementsForm.controls['childHeight']?.value;
            measurements.childWeight =
                this.measurementsForm.controls['childWeight']?.value;
            measurements.teenHeight =
                this.measurementsForm.controls['teenHeight']?.value;
            measurements.teenWeight =
                this.measurementsForm.controls['teenWeight']?.value;
            measurements.adultHeight =
                this.measurementsForm.controls['adultHeight']?.value;
            measurements.adultWeight =
                this.measurementsForm.controls['adultWeight']?.value;
        }

        character.measurements = measurements;
    }
}
