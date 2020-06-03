export interface IChapter {
  id: number | null;
  name: string;
  chapterDesc: string;
  pagesIds: number[];
}

export class Chapter implements IChapter {
  id: number | null;
  name: string;
  chapterDesc: string;
  pagesIds: number[];

  constructor(initialValues: IChapter) {
    Object.assign(this, initialValues);
  }
}
