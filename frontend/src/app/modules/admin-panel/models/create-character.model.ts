import { IColors } from '../../characters/models/colors.model';
import { ITemperament } from '../../characters/models/temperament.model';
import { IMeasurements } from '../../characters/models/measurements.model';

export class CreateCharacter {
    externalId: number = 0;
    charName: string = '';
    charSurname: string = '';
    pseudonim: string = '';
    gender: string = '';
    birthday: number = 0;
    death: number | null = null;
    deathReason: string | null = null;
    occupation: string = '';
    colors: IColors | null = null;
    temperament: ITemperament | null = null;
    measurements: IMeasurements | null = null;
    nationality: string = '';
}
