import {
    IStarringCharacter,
    StarringCharacter,
} from '../starring/starring-character.model';

export interface IChapter {
    id: number | null;
    name: string;
    chapterDesc: string;
    pagesIds: number[];
    createDate: number | null;
    actionTime: string;
    actionPlace: string;
    starringChars: IStarringCharacter[];
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

    createDateObj?: Date;

    constructor(initialValues: IChapter) {
        Object.assign(this, initialValues);
        if (initialValues.createDate) {
            this.createDateObj = new Date(initialValues.createDate * 1000);

            let sortedChars: StarringCharacter[] = [];

            const mainCharacters: StarringCharacter[] = [];
            const sideCharacters: StarringCharacter[] = [];
            const bgCharacters: StarringCharacter[] = [];
            const mentionedCharacters: StarringCharacter[] = [];

            if (initialValues.starringChars?.length)
                for (const starringCharObject of initialValues.starringChars) {
                    switch (starringCharObject.starringType) {
                        case 'MAIN':
                            mainCharacters.push(starringCharObject);
                            break;
                        case 'SIDE':
                            sideCharacters.push(starringCharObject);
                            break;
                        case 'BACKGROUND':
                            bgCharacters.push(starringCharObject);
                            break;
                        case 'MENTIONED':
                            mentionedCharacters.push(starringCharObject);
                            break;
                    }
                }

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
