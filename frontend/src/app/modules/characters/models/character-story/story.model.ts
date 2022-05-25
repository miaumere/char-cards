export interface IStory {
    id: number;
    story: string;
    title: string;
}

export class Story implements IStory {
    id: number = 0;
    story: string = '';
    title: string = '';

    constructor(initialValues: IStory) {
        Object.assign(this, initialValues);
    }
}
