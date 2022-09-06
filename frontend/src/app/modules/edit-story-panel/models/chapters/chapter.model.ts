export interface IChapter {
    id: number | null;
    name: string;
    chapterDesc: string;
    pagesIds: number[];
    createDate: number | null;
    actionTime: string;
    actionPlace: string;
}

export class Chapter implements IChapter {
    id: number | null = null;
    name: string = '';
    chapterDesc: string = '';
    pagesIds: number[] = [];
    createDate: number | null = null;
    actionTime: string = '';
    actionPlace: string = '';

    constructor(initialValues: IChapter) {
        Object.assign(this, initialValues);
    }
}
