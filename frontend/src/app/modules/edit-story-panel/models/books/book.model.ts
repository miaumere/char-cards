export interface IBook {
    id: number | null;
    color: string;
    name: string;
    symbol: string;
    bookOrder: number | null;
}

export class Book implements IBook {
    id: number | null = null;
    color: string = '';
    name: string = '';
    symbol: string = '';
    bookOrder: number | null = null;

    constructor(initialValues: IBook) {
        Object.assign(this, initialValues);
    }
    toString() {
        return this.name;
    }
}
