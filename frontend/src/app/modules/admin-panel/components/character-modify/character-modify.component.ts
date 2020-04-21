import { Measurements } from './../../../characters/models/measurements.model';
import { Temperament } from './../../../characters/models/temperament.model';
import { EditCharacter } from './../../models/edit-character.model';
import { Router } from '@angular/router';
import { CharactersService } from 'src/app/core/service/characters.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/base.component';
import { Colors } from 'src/app/modules/characters/models/colors.model';
import { finalize } from 'rxjs/operators';
import { validateImage } from 'src/app/modules/shared/functions/validate-image.function';
import { Gender } from '../../enums/gender.enum';
import { CharType } from '../../enums/character-type.enum';

type chooseFormType = 'SUBMIT' | number;
@Component({
  selector: 'app-character-modify',
  templateUrl: './character-modify.component.html',
  styleUrls: ['./character-modify.component.scss']
})

export class CharacterModifyComponent extends BaseComponent implements OnInit {
  readonly Gender = Gender;
  readonly CharType = CharType;

  formParts: string[] = [];

  isDead = true;

  newCharacterForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),

    birthday: new FormControl('', Validators.required),
    profession: new FormControl(''),
    death: new FormControl(''),
    deathReason: new FormControl(''),
    gender: new FormControl('', Validators.required),
    characterType: new FormControl('', Validators.required),

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
    characterType: new FormControl(''),

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

  birthdayDate;
  deathDate;

  profilePic: File | null = null;
  images: FileList | null = null;

  // TODO: poprawić typ, string nie moze byc dodawany
  chosenForm: any = 1;
  form = new FormGroup({});

  loading = true;

  @Input() type: 'NEW' | 'EDIT';
  @Input() charId: number;

  constructor(
    private _toastrService: ToastrService,
    private _charactersService: CharactersService,
    private _route: Router) { super(); }

  ngOnInit() {
    this.setModifyType();
    const melancholic = this.form.get('melancholic');
    const sanguine = this.form.get('sanguine');
    const flegmatic = this.form.get('flegmatic');
    const choleric = this.form.get('choleric');

    const temperamentArray = [melancholic, sanguine, flegmatic, choleric];

    temperamentArray.forEach(element => {
      if (element) {
        this.subscriptions$.add(
          element.valueChanges.subscribe(val => {
            switch (element) {
              case melancholic:
                this.melancholicValue = val;
                break;
              case sanguine:
                this.sanguineValue = val;
                break;
              case flegmatic:
                this.flegmaticValue = val;
                break;
              case choleric:
                this.cholericValue = val;
                break;
            }
          })
        );
      }
    });
  }

  toggleDeathState() {
    this.isDead = !this.isDead;
  }

  setForm(formId: chooseFormType) {
    this.chosenForm = formId;
  }

  setModifyType() {
    switch (this.type) {
      case 'NEW':
        this.form = this.newCharacterForm;
        this.formParts = [
          'Podstawowe dane',
          'Temperament',
          'Kolory',
          'Waga i wzrost',
          'Zdjęcia'
        ]
        break;

      case 'EDIT':
        this.form = this.editCharacterForm;
        this.formParts = [
          'Podstawowe dane',
          'Temperament',
          'Kolory',
          'Waga i wzrost'
        ]

        this.getCharacterDetails();

        break;
    }
  }

  handleFileInput(files: FileList, multiple: boolean) {
    multiple ? (this.images = files) : (this.profilePic = files.item(0));
  }

  modifyCharacter() {
    if (this.profilePic) {
      validateImage(this.profilePic, this._toastrService);
    }

    if (this.images && this.images.length > 0) {
      for (const key in this.images) {
        if (this.images.hasOwnProperty(key)) {
          const image = this.images[key];
          validateImage(image, this._toastrService);
        }
      }
    }

    switch (this.type) {
      case 'NEW':
        this.loading = true;

        const newCharFormValues: { [key: string]: string } = this.newCharacterForm.value;

        const formData = new FormData();
        for (const [key, value] of Object.entries(newCharFormValues)) {
          if (key === 'birthday') {
            formData.append(key, '' + new Date(value).getTime());
          } else if (key === 'death') {
            this.isDead ? formData.append(key, '' + new Date(value).getTime()) : formData.append(key, '');
          } else if (key === 'deathReason') {
            this.isDead ? formData.append(key, value) : formData.append(key, '');
          } else {
            formData.append(key, value);
          }
        }
        if (this.profilePic) {
          formData.append('profilePic', this.profilePic);
        }
        if (this.images) {
          for (let i = 0; i < this.images.length; i++) {
            formData.append('image' + i, this.images[i]);
          }
        }

        this.subscriptions$.add(
          this._charactersService.postNewCharacter(formData).subscribe(_ => {
            this._toastrService.success('Udało się dodać nową postać!');
            this._route.navigate(['admin-panel/main']);
          },
            err => {
              if (err && err.error) {
                this._toastrService.error(err.error);
              }
            })
        );

        break;


      case 'EDIT':
        this.loading = true;

        const objToSend = new EditCharacter();

        objToSend.externalId = +this.charId;

        objToSend.charName = this.editCharacterForm.controls['name']?.value;
        objToSend.charSurname = this.editCharacterForm.controls['surname']?.value;
        objToSend.birthday = new Date(this.editCharacterForm.controls['birthday']?.value).getTime();
        objToSend.gender = this.editCharacterForm.controls['gender'].value;
        objToSend.characterType = this.editCharacterForm.controls['characterType'].value;
        if (this.isDead) {
          objToSend.death = new Date(this.editCharacterForm.controls['death']?.value).getTime();
          objToSend.deathReason = this.editCharacterForm.controls['deathReason']?.value;
        } else {
          objToSend.death = null;
          objToSend.deathReason = null;
        }
        objToSend.occupation = this.editCharacterForm.controls['profession']?.value;

        const colors = new Colors();
        colors.themeColor1 = this.editCharacterForm.controls['themeColor1']?.value;
        colors.themeColor2 = this.editCharacterForm.controls['themeColor2']?.value;
        colors.themeColor3 = this.editCharacterForm.controls['themeColor3']?.value;
        colors.eyeColor1 = this.editCharacterForm.controls['eyeColor1']?.value;
        colors.eyeColor2 = this.editCharacterForm.controls['eyeColor2']?.value;
        colors.hairColor = this.editCharacterForm.controls['hairColor']?.value;
        colors.skinColor = this.editCharacterForm.controls['skinColor']?.value;

        objToSend.colors = colors;

        const temperament = new Temperament(this.cholericValue, this.flegmaticValue, this.melancholicValue, this.sanguineValue);

        objToSend.temperament = temperament;

        const measurements = new Measurements();
        measurements.babyHeight = this.editCharacterForm.controls['babyHeight']?.value;
        measurements.babyWeight = this.editCharacterForm.controls['babyWeight']?.value;
        measurements.childHeight = this.editCharacterForm.controls['childHeight']?.value;
        measurements.childWeight = this.editCharacterForm.controls['childWeight']?.value;
        measurements.teenHeight = this.editCharacterForm.controls['teenHeight']?.value;
        measurements.teenWeight = this.editCharacterForm.controls['teenWeight']?.value;
        measurements.adultHeight = this.editCharacterForm.controls['adultHeight']?.value;
        measurements.adultWeight = this.editCharacterForm.controls['adultWeight']?.value;

        objToSend.measurements = measurements;

        console.log(objToSend);
        this.subscriptions$.add(
          this._charactersService
            .putCharacterDetails(objToSend, this.isDead)
            .pipe(
              finalize(() => {
                this.loading = false;
              })
            )
            .subscribe(_ => {
              this._toastrService.success('Udało się zmienić dane o postaci!');
              this._route.navigate(['admin-panel/main']);
              this.getCharacterDetails();
            },
              err => {
                this._toastrService.error(err.error);
              })
        )
    }
  }

  getCharacterDetails() {
    this.subscriptions$.add(

      this._charactersService
        .getCharacterDetails(this.charId)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(charDetails => {
          if (this.editCharacterForm) {
            this.birthdayDate = charDetails.birthday;
            this.deathDate = charDetails.death;

            this.editCharacterForm.get('name')?.setValue(charDetails.charName);
            this.editCharacterForm.get('surname')?.setValue(charDetails.charSurname);
            // this.editCharacterForm.get('birthday')?.setValue(charDetails.birthday ? timestampToDate(charDetails.birthday) : null);
            // this.editCharacterForm.get('death')?.setValue(charDetails.death ? timestampToDate(charDetails.death) : null);
            this.editCharacterForm.get('deathReason')?.setValue(charDetails.deathReason);
            this.editCharacterForm.get('profession')?.setValue(charDetails.occupation);
            this.editCharacterForm.get('gender')?.setValue(charDetails.gender);
            this.editCharacterForm.get('characterType')?.setValue(charDetails.characterType);

            this.editCharacterForm.get('themeColor1')?.setValue(charDetails.colors.themeColor1);
            this.editCharacterForm.get('themeColor2')?.setValue(charDetails.colors.themeColor2);
            this.editCharacterForm.get('themeColor3')?.setValue(charDetails.colors.themeColor3);
            this.editCharacterForm.get('eyeColor1')?.setValue(charDetails.colors.eyeColor1);
            this.editCharacterForm.get('eyeColor2')?.setValue(charDetails.colors.eyeColor2);
            this.editCharacterForm.get('hairColor')?.setValue(charDetails.colors.hairColor);
            this.editCharacterForm.get('skinColor')?.setValue(charDetails.colors.skinColor);

            this.editCharacterForm.get('melancholic')?.setValue(charDetails.temperament.melancholic);
            this.editCharacterForm.get('flegmatic')?.setValue(charDetails.temperament.flegmatic);
            this.editCharacterForm.get('sanguine')?.setValue(charDetails.temperament.sanguine);
            this.editCharacterForm.get('choleric')?.setValue(charDetails.temperament.choleric);

            this.editCharacterForm.get('babyHeight')?.setValue(charDetails.measurements.babyHeight);
            this.editCharacterForm.get('babyWeight')?.setValue(charDetails.measurements.babyWeight);
            this.editCharacterForm.get('childHeight')?.setValue(charDetails.measurements.childHeight);
            this.editCharacterForm.get('childWeight')?.setValue(charDetails.measurements.childWeight);
            this.editCharacterForm.get('teenHeight')?.setValue(charDetails.measurements.teenHeight);
            this.editCharacterForm.get('teenWeight')?.setValue(charDetails.measurements.teenWeight);
            this.editCharacterForm.get('adultHeight')?.setValue(charDetails.measurements.adultHeight);
            this.editCharacterForm.get('adultWeight')?.setValue(charDetails.measurements.adultWeight);
          }
        }
        )
    )
  }

}
