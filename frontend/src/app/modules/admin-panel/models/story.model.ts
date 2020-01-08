import { Title } from '@angular/platform-browser';

export class StoryForCharacter {
  id: number | null;
  title: Title;
  story: string | null;
}

export class Story {
  constructor(titleId, story) {
    this.titleId = titleId;
    this.story = story;
  }
  titleId: number;
  story: string;
}
