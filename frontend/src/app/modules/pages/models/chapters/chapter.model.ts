import {
    IStarringCharacter,
    StarringCharacter,
} from 'src/app/modules/edit-story-panel/models/starring/starring-character.model';

export interface IChapter {
    id: number | null;
    name: string;
    chapterDesc: string;
    pagesIds: number[];
    createDate: number | null;
    actionTime: string;
    actionPlace: string;
    starringChars: IStarringCharacter[];
    visible: boolean;
}

export class Chapter implements IChapter {
    id: number | null = null;
    name: string = '';
    chapterDesc: string = '';
    pagesIds: number[] = [];
    createDate: number | null = null;
    actionTime: string = '';
    actionPlace: string = '';
    starringChars: IStarringCharacter[] = [];

    visible: boolean = false;

    createDateObj?: Date;

    constructor(initialValues: IChapter) {
        Object.assign(this, initialValues);
        if (initialValues.createDate) {
            this.createDateObj = new Date(initialValues.createDate * 1000);

            let sortedChars: StarringCharacter[] = [];
            const mainCharacters = initialValues.starringChars.filter(
                (x) => x.starringType === 'MAIN'
            );
            const sideCharacters = initialValues.starringChars.filter(
                (x) => x.starringType === 'SIDE'
            );
            const bgCharacters = initialValues.starringChars.filter(
                (x) => x.starringType === 'BACKGROUND'
            );
            const mentionedCharacters = initialValues.starringChars.filter(
                (x) => x.starringType === 'MENTIONED'
            );

            if (!!mainCharacters) {
                sortedChars = mainCharacters;
            }
            if (!!sideCharacters) {
                sortedChars = sortedChars.concat(sideCharacters);
            }
            if (!!bgCharacters) {
                sortedChars = sortedChars.concat(bgCharacters);
            }
            if (!!mentionedCharacters) {
                sortedChars = sortedChars.concat(mentionedCharacters);
            }

            this.starringChars = sortedChars;
        }
    }
}
