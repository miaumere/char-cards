import { Story } from '../../admin-panel/models/story.model';
import { IColors } from './colors.model';
import { IImageForMain } from './image-for-main.model';
import { ITemperament } from './temperament.model';
import { IMeasurements } from './measurements.model';
import { IQuote } from './quote.model';
import { IRelationship } from './relationship.model';

type characterType = 'MAIN' | 'SIDE' | 'BACKGROUND' | null;
type gender = 'MALE' | 'FEMALE' | null;
export interface ICharacter {
  externalId: number;
  charName: string;
  charSurname: string;
  birthday: number;
  gender: gender;
  death: number;
  deathReason: string;
  occupation: string;
  story: Story[];
  colors: IColors;
  imagesList: IImageForMain[];
  temperament: ITemperament;
  measurements: IMeasurements;
  quotes: IQuote;
  charType: characterType;
  relationships: IRelationship[] | null;
}

export class Character {
  externalId: number;
  charName: string;
  charSurname: string;
  birthday: number;
  death: number;
  deathReason: string;
  occupation: string;
  story: Story[];
  colors: IColors;
  imagesList: IImageForMain[];
  temperament: ITemperament;
  measurements: IMeasurements;
  quotes: IQuote;
  charType: characterType;
  relationships: IRelationship[] | null;
}

