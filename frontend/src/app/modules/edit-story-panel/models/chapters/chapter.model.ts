export interface IChapter {
  id: number;
  name: string;
  chapterDesc: string;
}

export class Chapter implements IChapter {
  id: number;
  name: string;
  chapterDesc: string;

  constructor(initialValues: IChapter) {
    Object.assign(this, initialValues);
  }
}
