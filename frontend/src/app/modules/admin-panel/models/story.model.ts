export class StoryForCharacter {
  characterId: number;
  stories: Story[];
}

export class Story {
  constructor(titleId, story) {
    this.titleId = titleId;
    this.story = story;
  }
  titleId: number;
  story: string;
}
