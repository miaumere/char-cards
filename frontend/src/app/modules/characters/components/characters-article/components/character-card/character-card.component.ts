import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { Character, ICharacter } from 'src/app/modules/characters/models/character.model';
import { CharactersService } from 'src/app/core/service/characters.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import * as tinycolor from 'tinycolor2';
import { Measurements, IMeasurements } from 'src/app/modules/characters/models/measurements.model';

type charType = 'postać główna' | 'postać poboczna' | 'postać epizodyczna' | '';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['baby', 'child', 'teen', 'adult'];

  measurementsData: any[] = [];


  @Output() bgColorFromChild = new EventEmitter<string>();

  routeId: number | null = null;
  character: Character | null = null;
  currentImageIndex = 0;

  loading = true;

  themeColor1 = '';
  bgColor1 = '';
  bgColor2 = '';

  charType: charType = '';

  constructor(
    private _charactersService: CharactersService,
    private _route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    // FIXME tutaj ten ... sub

    this._route.params.subscribe(route => {
      this.routeId = route.id;
      this.currentImageIndex = 0;
      this.getCharacterById();
    })

  }

  getCharacterById() {
    this.character = null;

    // FIXME Sub
    if (this.routeId !== null) {
      this._charactersService.getCharacterById(this.routeId)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(character => {
          this.character = new Character(character);
          const measurementsInstance = new Measurements(character.measurements);
          this.character.measurements = measurementsInstance;
          const characterHeight = [
            measurementsInstance.getValueWithUnit(measurementsInstance.babyHeight, 'height'),
            measurementsInstance.getValueWithUnit(measurementsInstance.childHeight, 'height'),
            measurementsInstance.getValueWithUnit(measurementsInstance.teenHeight, 'height'),
            measurementsInstance.getValueWithUnit(measurementsInstance.adultHeight, 'height')
          ];
          const charachterWeight = [
            measurementsInstance.getValueWithUnit(measurementsInstance.babyWeight, 'weight'),
            measurementsInstance.getValueWithUnit(measurementsInstance.childWeight, 'weight'),
            measurementsInstance.getValueWithUnit(measurementsInstance.teenWeight, 'weight'),
            measurementsInstance.getValueWithUnit(measurementsInstance.adultWeight, 'weight')
          ];
          this.measurementsData = [characterHeight, charachterWeight];

          switch (this.character?.charType) {
            case 'MAIN':
              this.charType = 'postać główna';
              break;

            case 'SIDE':
              this.charType = 'postać poboczna';
              break;

            case 'BACKGROUND':
              this.charType = 'postać epizodyczna';
              break;

            default:
              break;
          }
          this.bgColorFromChild.emit(character.colors.themeColor1);
          const themeColorForChar = tinycolor(character?.colors?.themeColor1);
          const bgColorForChar = tinycolor(character?.colors?.themeColor2);
          const darkerBgColorForChar = tinycolor(character?.colors?.themeColor2);

          this.bgColor1 = tinycolor(bgColorForChar).darken(15).desaturate(10);
          this.bgColor2 = tinycolor(darkerBgColorForChar).darken(25).desaturate(30);

          if (themeColorForChar.isLight()) {
            this.themeColor1 = tinycolor(
              themeColorForChar
            ).darken(15);
          } else {
            this.themeColor1 = tinycolor(
              themeColorForChar
            ).lighten(35);
          }
        });
    }
  }

  setImage(imageIndex: number) {
    this.currentImageIndex = imageIndex;
  }
}
