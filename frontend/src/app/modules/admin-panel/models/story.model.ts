export interface IStory {
  titleId: number;
  story: string;
}

export class Story implements IStory {
  constructor(titleId, story) {
    this.titleId = titleId;
    this.story = story;
  }
  titleId: number;
  story: string;
}
