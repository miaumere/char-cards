import { Story } from '../../admin-panel/models/character-story/story.model';
import { IColors } from './colors.model';
import { IImageForMain } from './image-for-main.model';
import { ITemperament } from './temperament.model';
import { IMeasurements, Measurements } from './measurements.model';
import { IQuote } from './quote.model';
import { IRelationship } from './relationship.model';
import { IStarringIn } from './starring-in.model';

type characterType = 'MAIN' | 'SIDE' | 'BACKGROUND' | null;
type gender = 'MALE' | 'FEMALE' | null;
export interface ICharacter {
  externalId: number;
  charName: string;
  charSurname: string;
  pseudonim: string;
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
  quote: IQuote;
  charType: characterType;
  relationships: IRelationship[] | null;
  nationality: string;
  starringIn: IStarringIn[];
}

export class Character implements ICharacter {
  externalId: number;
  charName: string;
  charSurname: string;
  pseudonim: string;
  birthday: number;
  gender: gender;
  death: number;
  deathReason: string;
  occupation: string;
  story: Story[];
  colors: IColors;
  imagesList: IImageForMain[];
  temperament: ITemperament;
  measurements: Measurements;
  quote: IQuote;
  charType: characterType;
  relationships: IRelationship[] | null;
  nationality: string;
  starringIn: IStarringIn[];

  constructor(initialValues: ICharacter) {
    Object.assign(this, initialValues);
  }

}

