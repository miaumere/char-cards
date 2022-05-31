export interface IQuote {
    id: number;
    quote: string;
    context?: string;
}

export class Quote {
    id: number = 0;
    quote: string = '';
    context?: string = '';

    constructor(initialValues: IQuote) {
        Object.assign(this, initialValues);
    }
}
