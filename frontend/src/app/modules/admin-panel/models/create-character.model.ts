import { IColors } from '../../characters/models/colors.model';
import { ITemperament } from '../../characters/models/temperament.model';
import { IMeasurements } from '../../characters/models/measurements.model';

export class CreateCharacter {
  charName: string;
  charSurname: string;
  gender: string;
  birthday: number;
  death: number | null;
  deathReason: string | null;
  occupation: string;
  colors: IColors;
  temperament: ITemperament;
  measurements: IMeasurements;
  nationality: string;

}
