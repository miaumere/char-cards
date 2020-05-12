import { CharacterItem } from './../../../characters/models/character-item.model';
export interface IChapterWithChars {
  id: number;
  chapterDesc: string;
  name: string;
  pagesIds: number[];
  starringChars: CharacterItem[];
}

export class ChapterWithChars implements IChapterWithChars {
  id: number;
  chapterDesc: string;
  name: string;
  pagesIds: number[];
  starringChars: CharacterItem[];

  constructor(initialValues: IChapterWithChars) {
    Object.assign(this, initialValues);
  }
}
