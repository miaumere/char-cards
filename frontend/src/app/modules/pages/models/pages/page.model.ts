export interface IPage {
  id: number;
  fileName: string;
  pageNumber: number;
}

export class Page implements IPage {
  id: number;
  fileName: string;
  pageNumber: number;

  constructor(initialValues: IPage) {
    Object.assign(this, initialValues);
  }
}
