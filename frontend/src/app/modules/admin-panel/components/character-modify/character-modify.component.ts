import { Measurements } from './../../../characters/models/measurements.model';
import { Temperament } from './../../../characters/models/temperament.model';
import { EditCharacter } from './../../models/edit-character.model';
import { Router } from '@angular/router';
import { CharactersService } from 'src/app/core/service/characters.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/base.component';
import { validateImage } from 'src/app/shared/functions/validate-image.function';
import { Colors } from 'src/app/modules/characters/models/colors.model';

type chooseFormType = 'SUBMIT' | number;
@Component({
  selector: 'app-character-modify',
  templateUrl: './character-modify.component.html',
  styleUrls: ['./character-modify.component.scss']
})

export class CharacterModifyComponent extends BaseComponent implements OnInit {
  readonly formParts = [
    'Podstawowe dane',
    'Temperament',
    'Kolory',
    'Waga i wzrost',
    'Zdjęcia'
  ];

  isDead = false;

  newCharacterForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),

    birthday: new FormControl('', Validators.required),
    profession: new FormControl(''),
    death: new FormControl(''),
    deathReason: new FormControl(''),

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

    birthday: new FormControl('', Validators.required),
    profession: new FormControl(''),
    death: new FormControl(''),
    deathReason: new FormControl(''),

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

  profilePic: File | null = null;
  images: FileList | null = null;

  // TODO: poprawić typ, string nie moze byc dodawany
  chosenForm: any = 1;
  form: FormGroup;

  @Input() type;
  @Input() charId;

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

  changeDeathState() {
    this.isDead = !this.isDead;
  }

  setForm(formId: chooseFormType) {
    this.chosenForm = formId;
  }

  setModifyType() {
    switch (this.type) {
      case 'NEW':
        this.form = this.newCharacterForm;
        break;

      case 'EDIT':
        this.form = this.editCharacterForm;
        break;
    }
  }

  handleFileInput(files: FileList, multiple: boolean) {
    multiple ? this.images = files : this.profilePic = files.item(0);
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
                console.dir(err);
                this._toastrService.error(err.error);
              }
            })
        );

        break;


      case 'EDIT':
        const objToSend = new EditCharacter();

        objToSend.externalId = this.charId;

        objToSend.charName = this.editCharacterForm.controls['name']?.value;
        objToSend.charSurname = this.editCharacterForm.controls['surname']?.value;
        objToSend.birthday = new Date(this.editCharacterForm.controls['birthday']?.value).getTime();
        if (this.isDead) {
          objToSend.death = new Date(this.editCharacterForm.controls['death']?.value).getTime();
          objToSend.deathReason = this.editCharacterForm.controls['deathReason']?.value;
        } else {
          objToSend.death = null;
          objToSend.deathReason = null;
        }
        objToSend.occupation = this.editCharacterForm.controls['occupation']?.value;


        const colors = new Colors();
        colors.themeColor1 = this.editCharacterForm.controls['themeColor1']?.value;
        colors.themeColor2 = this.editCharacterForm.controls['themeColor2']?.value;
        colors.themeColor3 = this.editCharacterForm.controls['themeColor3']?.value;
        colors.eyeColor1 = this.editCharacterForm.controls['eyeColor1']?.value;
        colors.eyeColor2 = this.editCharacterForm.controls['eyeColor2']?.value;
        colors.hairColor = this.editCharacterForm.controls['hairColor']?.value;
        colors.skinColor = this.editCharacterForm.controls['skinColor']?.value;

        objToSend.colors = colors;

        const temperament = new Temperament();
        temperament.choleric = this.cholericValue;
        temperament.flegmatic = this.flegmaticValue;
        temperament.melancholic = this.melancholicValue;
        temperament.sanguine = this.sanguineValue;

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


      // this.subscriptions$.add(
      //   this._charactersService
      // )
    }
  }


}
