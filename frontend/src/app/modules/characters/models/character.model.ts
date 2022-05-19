import { Story } from '../../admin-panel/models/character-story/story.model';
import { IColors } from './colors.model';
import { IImageForMain } from './image-for-main.model';
import { ITemperament } from './temperament.model';
import { IMeasurements, Measurements } from './measurements.model';
import { IQuote } from './quote.model';
import { IStarringIn } from './starring-in.model';
import { Gender, GenderString } from '../../admin-panel/enums/gender.enum';

type characterType = 'MAIN' | 'SIDE' | 'BACKGROUND' | null;
export interface ICharacter {
    externalId: number;
    charName: string;
    charSurname: string;
    pseudonim: string;
    birthday: number;
    gender: GenderString;
    death: number;
    deathReason: string;
    occupation: string;
    story: Story[];
    colors: IColors | null;
    imagesList: IImageForMain[];
    temperament: ITemperament | null;
    measurements: IMeasurements | null;
    quote: IQuote | null;
    charType: characterType;
    nationality: string;
    starringIn: IStarringIn[];
    profilePic: string | null;
}

export class Character implements ICharacter {
    externalId: number = 0;
    charName: string = '';
    charSurname: string = '';
    pseudonim: string = '';

    profilePic: string | null = null;
    imagesList: IImageForMain[] = [];

    birthday: number = 0;
    gender: GenderString = Gender[Gender.UNKNOWNGENDER] as GenderString;
    death: number = 0;
    deathReason: string = '';
    occupation: string = '';
    story: Story[] = [];
    colors: IColors | null = null;
    temperament: ITemperament | null = null;
    measurements: Measurements | null = null;
    quote: IQuote | null = null;
    charType: characterType = 'BACKGROUND';
    nationality: string = '';
    starringIn: IStarringIn[] = [];

    constructor(initialValues: ICharacter) {
        Object.assign(this, initialValues);
    }
}
