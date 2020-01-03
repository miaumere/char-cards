import { Colors } from './colors.model';
import { Temperament } from './temperament.model';
import { Measurements } from './measurements.model';
import { Quote } from '@angular/compiler';

export class Character {
  externalId: number;
  charName: string;
  charSurname: string;
  birthday: number;
  death: number;
  deathReason: string;
  occupation: string;
  story: Story[];
  colors: Colors;
  imagesList: string[];
  temperament: Temperament;
  measurements: Measurements;
  quotes: Quote;
}
