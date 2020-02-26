import { IColors } from '../../characters/models/colors.model';

import {
  ITemperament
} from '../../characters/models/temperament.model';

import { IMeasurements } from '../../characters/models/measurements.model';

export interface IEditCharacter {
  externalId: number;
  charName: string;
  charSurname: string;
  birthday: number;
  death: number | null;
  deathReason: string | null;
  occupation: string;
  colors: IColors;
  temperament: ITemperament;
  measurements: IMeasurements;
}

export class EditCharacter implements IEditCharacter {
  externalId: number;
  charName: string;
  charSurname: string;
  birthday: number;
  death: number | null;
  deathReason: string | null;
  occupation: string;
  colors: IColors;
  temperament: ITemperament;
  measurements: IMeasurements;
}
