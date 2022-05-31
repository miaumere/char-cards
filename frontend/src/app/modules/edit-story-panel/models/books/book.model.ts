export interface IBook {
    id: number;
    color: string;
    name: string;
    icon: string;
}

export class Book implements IBook {
    id: number = 0;
    color: string = '';
    name: string = '';
    icon: string = '';

    constructor(initialValues: IBook) {
        Object.assign(this, initialValues);
    }
}
