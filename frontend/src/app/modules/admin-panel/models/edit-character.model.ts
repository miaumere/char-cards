import { Colors } from '../../characters/models/colors.model';

import { Temperament } from '../../characters/models/temperament.model';

import { Measurements } from '../../characters/models/measurements.model';

export class EditCharacter {
  externalId: number;
  charName: string;
  charSurname: string;
  birthday: number;
  death: number;
  deathReason: string;
  occupation: string;
  colors: Colors;
  temperament: Temperament;
  measurements: Measurements;
}
