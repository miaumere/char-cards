import { IColors } from '../../characters/models/colors.model';

import { ITemperament } from '../../characters/models/temperament.model';

import { IMeasurements } from '../../characters/models/measurements.model';

export interface IEditCharacter {
    externalId: number;
    charName: string;
    charSurname: string;
    pseudonim: string;
    gender: string;
    birthday: number;
    death: number | null;
    deathReason: string | null;
    occupation: string;
    colors: IColors | null;
    temperament: ITemperament | null;
    measurements: IMeasurements | null;
    nationality: string;
    mbtiPersonality: string;

    favouriteFood: string;
    leastFavouriteFood: string;
    hobby: string;
    likes: string;
    dislikes: string;
}

export class EditCharacter implements IEditCharacter {
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
    mbtiPersonality: string = '';

    favouriteFood: string = '';
    leastFavouriteFood: string = '';
    hobby: string = '';
    likes: string = '';
    dislikes: string = '';
}
