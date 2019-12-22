import { Route, Router } from '@angular/router';
import { CharactersService } from 'src/app/core/service/characters.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/base.component';
import { validateImage } from 'src/app/shared/functions/validate-image.function';

type chooseFormType = 'SUBMIT' | number;
@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.scss']
})

export class NewCharacterComponent extends BaseComponent implements OnInit {
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

  melancholicValue = 0;
  sanguineValue = 0;
  flegmaticValue = 0;
  cholericValue = 0;

  profilePic: File | null = null;
  images: FileList | null = null;

  chosenForm: chooseFormType = 1;

  constructor(private _toastrService: ToastrService,
    private _charactersService: CharactersService,
    private _route: Router) { super(); }

  ngOnInit() {
    const melancholic = this.newCharacterForm.get('melancholic');
    const sanguine = this.newCharacterForm.get('sanguine');
    const flegmatic = this.newCharacterForm.get('flegmatic');
    const choleric = this.newCharacterForm.get('choleric');

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
        )
      }
    });
  }

  changeDeathState() {
    this.isDead = !this.isDead;
  }

  setForm(formId: chooseFormType) {
    this.chosenForm = formId;
  }

  handleFileInput(files: FileList, multiple: boolean) {
    multiple ? this.images = files : this.profilePic = files.item(0);
  }


  createNewChar() {
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

    const formValues: { [key: string]: string } = this.newCharacterForm.value;


    const formData = new FormData();
    for (const [key, value] of Object.entries(formValues)) {
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
        this._route.navigate(["../"])
      },
        err => {
          if (err && err.error) {
            console.dir(err)
            this._toastrService.error(err.error);
          }
        })
    )
  }
}
