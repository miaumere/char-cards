import { StarringCharacter } from 'src/app/modules/edit-story-panel/models/starring/starring-character.model';
import { IChapter, Chapter } from '../chapters/chapter.model';

export interface IChapterWithChars extends IChapter {
    id: number;

    pagesIds: number[];
}

export class ChapterWithChars extends Chapter implements IChapterWithChars {
    id: number = 0;

    pagesIds: number[] = [];

    constructor(initialValues: IChapterWithChars) {
        super(initialValues);
        Object.assign(this, initialValues);

        this.visible = !!initialValues.visible;
        if (initialValues.createDate) {
            this.createDateObj = new Date(initialValues.createDate * 1000);
        }
        if (
            initialValues.starringChars &&
            !!initialValues.starringChars.length
        ) {
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
