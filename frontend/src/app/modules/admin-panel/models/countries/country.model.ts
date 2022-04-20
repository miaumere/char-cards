export interface ICountry {
    flags: {
        svg: string;
        png: string;
    };
    name: { common: string };
    cca2: string;
}

export class Country implements ICountry {
    flags: {
        svg: string;
        png: string;
    };
    name: { common: string };
    cca2: string;

    constructor(initialValues: ICountry) {
        Object.assign(this, initialValues);
    }
}
