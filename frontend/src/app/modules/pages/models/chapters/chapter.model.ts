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
    }
}
