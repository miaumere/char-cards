import { IStarringCharacter } from 'src/app/modules/characters/models/starring-in/starring-character.model';

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
    bookId: number;
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
    bookId: number = 0;

    constructor(initialValues: IChapter) {
        Object.assign(this, initialValues);
    }
}
