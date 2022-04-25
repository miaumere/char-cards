export interface IPage {
    id: number;
    fileName: string;
    pageNumber: number;
}

export class Page implements IPage {
    id: number = 0;
    fileName: string = '';
    pageNumber: number = 0;

    constructor(initialValues: IPage) {
        Object.assign(this, initialValues);
    }
}
