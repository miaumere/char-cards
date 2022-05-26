export interface ITag {
    id?: number;
    color: string;
    name: string;
}

export class Tag implements ITag {
    id?: number = 0;
    color: string = '';
    name: string = '';
    constructor(initialValues: ITag) {
        Object.assign(this, initialValues);
    }
}
