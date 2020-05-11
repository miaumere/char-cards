export interface IChapter {
  id: number | null;
  name: string;
  chapterDesc: string;
  pagesNumber: number;
}

export class Chapter implements IChapter {
  id: number | null;
  name: string;
  chapterDesc: string;
  pagesNumber: number;

  constructor(initialValues: IChapter) {
    Object.assign(this, initialValues);
  }
}
