export interface IChapter {
  id: number | null;
  name: string;
  chapterDesc: string;
}

export class Chapter implements IChapter {
  id: number | null;
  name: string;
  chapterDesc: string;

  constructor(initialValues: IChapter) {
    Object.assign(this, initialValues);
  }
}
