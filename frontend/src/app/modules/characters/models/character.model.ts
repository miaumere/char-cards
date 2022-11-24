import { Colors, IColors } from './colors.model';
import { IImageForMain } from './image-for-main.model';
import { ITemperament, Temperament } from './temperament.model';
import { IMeasurementObj, IMeasurements } from './measurements.model';
import { IQuote } from './quote.model';
import { IStarringIn } from './starring-in.model';
import { Gender, GenderString } from '../enums/gender.enum';
import { Story } from './character-story/story.model';
import { ITag, Tag } from '../../tags/models/tag.model';

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
    measurements: { [key: string]: IMeasurementObj } | null;
    quote: IQuote | null;
    charType: characterType;
    nationality: string;
    starringIn: IStarringIn[];
    profilePic: string | null;
    mbtiPersonality: string;

    favouriteFood: string;
    leastFavouriteFood: string;
    hobby: string;
    likes: string;
    dislikes: string;

    tags: ITag[];
}

export class Character implements ICharacter, IMeasurements {
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
    measurements: { [key: string]: IMeasurementObj } | null = null;
    quote: IQuote | null = null;
    charType: characterType = 'BACKGROUND';
    nationality: string = '';
    starringIn: IStarringIn[] = [];
    mbtiPersonality: string = '';

    favouriteFood: string = '';
    leastFavouriteFood: string = '';
    hobby: string = '';
    likes: string = '';
    dislikes: string = '';

    tags: ITag[] = [];
    fullName: string = '';

    babyHeight: number | null = null;
    babyWeight: number | null = null;
    childHeight: number | null = null;
    childWeight: number | null = null;
    teenHeight: number | null = null;
    teenWeight: number | null = null;
    adultHeight: number | null = null;
    adultWeight: number | null = null;

    constructor(initialValues?: ICharacter) {
        if (initialValues) {
            this.colors = new Colors();

            Object.assign(this, initialValues);

            if (initialValues.measurements) {
                this.measurements = {};

                const defineOrder = ['baby', 'child', 'teen', 'adult'];

                let orderedEntries = Object.entries(
                    initialValues.measurements
                ).sort((curr, next) => {
                    let result =
                        defineOrder.indexOf(curr[0]) >
                        defineOrder.indexOf(next[0]);
                    return result ? 1 : -1;
                });

                for (const [key, value] of orderedEntries) {
                    this.measurements[key] = value;
                }
            }

            if (!initialValues.temperament) {
                this.temperament = new Temperament(0, 0, 0, 0);
            }

            if (!initialValues.colors) {
                this.colors = new Colors();
            }

            this.fullName = `${this.charName} ${this.charSurname ?? ''}`;
        } else {
            this.charName = '';
            this.colors = new Colors();
            this.temperament = new Temperament(0, 0, 0, 0);
        }
    }
}
