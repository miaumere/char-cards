import { ITitle } from './title.model';

export class IStoryForCharacter {
  id: number | null;
  title: ITitle;
  story: string | null;
}
export class StoryForCharacter implements IStoryForCharacter {
  id: number | null;
  title: ITitle;
  story: string | null;

  constructor(initialValues: IStoryForCharacter) {
    Object.assign(this, initialValues);
  }
}
