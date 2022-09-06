import { IStarringCharacter } from './../../../edit-story-panel/models/starring/starring-character.model';
import { CharacterItem } from './../../../characters/models/character-item.model';
import {
    Chapter,
    IChapter,
} from 'src/app/modules/edit-story-panel/models/chapters/chapter.model';

export interface IChapterWithChars extends IChapter {
    id: number;
    chapterDesc: string;
    name: string;
    pagesIds: number[];
    starringChars: IStarringCharacter[];
}

export class ChapterWithChars extends Chapter implements IChapterWithChars {
    id: number = 0;
    chapterDesc: string = '';
    name: string = '';
    pagesIds: number[] = [];
    starringChars: IStarringCharacter[] = [];

    constructor(initialValues: IChapterWithChars) {
        super(initialValues);
        Object.assign(this, initialValues);
    }
}
