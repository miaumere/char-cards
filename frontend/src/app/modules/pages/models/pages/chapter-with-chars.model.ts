import { IStarringCharacter } from './../../../edit-story-panel/models/starring/starring-character.model';
import { CharacterItem } from './../../../characters/models/character-item.model';
export interface IChapterWithChars {
  id: number;
  chapterDesc: string;
  name: string;
  pagesIds: number[];
  starringChars: IStarringCharacter[];
}

export class ChapterWithChars implements IChapterWithChars {
  id: number;
  chapterDesc: string;
  name: string;
  pagesIds: number[];
  starringChars: IStarringCharacter[];

  constructor(initialValues: IChapterWithChars) {
    Object.assign(this, initialValues);
  }
}
