import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/base.component';

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

    imagesList: new FormControl(),
    profilePic: new FormControl(),


    // profilePic: new FormControl()
  });

  melancholicValue = 0;
  sanguineValue = 0;
  flegmaticValue = 0;
  cholericValue = 0;

  chosenForm: chooseFormType = 1;

  constructor() { super(); }

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

  createNewChar() {
    const formValues: { [key: string]: string } = this.newCharacterForm.value;
    console.log(formValues);
  }
}
