import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['../change-character-data/change-character-data.component.scss']
})
export class NewCharacterComponent implements OnInit {


  isDead = false;

  newCharacterForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),

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

    imagesList: new FormControl(),
    profilePic: new FormControl(),


    // profilePic: new FormControl()
  });

  melancholicValue = 0;

  @ViewChild('melancholic', { static: false }) melancholic;

  constructor() { }

  ngOnInit() {
    let melancholic = this.newCharacterForm.get('melancholic');
    if (melancholic) {
      melancholic.valueChanges.subscribe(val => {
        this.melancholicValue = val
      })
    }

  }

  changeDeathState() {
    this.isDead = !this.isDead
    console.log(this.isDead)
  }

  createNewChar() {
    const formValues: { [key: string]: string } = this.newCharacterForm.value;
    console.log(formValues)
  }
}
