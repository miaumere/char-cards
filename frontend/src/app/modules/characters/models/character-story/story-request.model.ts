export class StoryRequest {
    storyId: number = 0;
    characterId: number = 0;

    title: string = '';
    story: string = '';

    constructor(
        formValue: { title: string; story: string },
        characterId: number,
        storyId: number
    ) {
        this.characterId = characterId;
        this.storyId = storyId;

        this.title = formValue.title;
        this.story = formValue.story;
    }
}
