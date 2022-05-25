import { Story } from '../../admin-panel/models/character-story/story.model';
import { Colors, IColors } from './colors.model';
import { IImageForMain } from './image-for-main.model';
import { ITemperament, Temperament } from './temperament.model';
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
    profession: string;
    archived: boolean;

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

    archived: boolean = false;

    birthday: number = 0;
    gender: GenderString = Gender[Gender.UNKNOWNGENDER] as GenderString;
    death: number = 0;
    deathReason: string = '';
    occupation: string = '';
    profession: string = '';
    story: Story[] = [];
    colors: IColors | null = null;
    temperament: ITemperament | null = null;
    measurements: Measurements | null = null;
    quote: IQuote | null = null;
    charType: characterType = 'BACKGROUND';
    nationality: string = '';
    starringIn: IStarringIn[] = [];

    constructor(initialValues?: ICharacter) {
        if (initialValues) {
            this.colors = new Colors();
            this.measurements = new Measurements();

            Object.assign(this, initialValues);
            if (!initialValues.temperament) {
                this.temperament = new Temperament(0, 0, 0, 0);
            }
            if (!initialValues.measurements) {
                this.measurements = new Measurements();
            }
            if (!initialValues.colors) {
                this.colors = new Colors();
            }
        } else {
            this.charName = '';
            this.colors = new Colors();
            this.temperament = new Temperament(0, 0, 0, 0);
            this.measurements = new Measurements();
        }
    }
}
