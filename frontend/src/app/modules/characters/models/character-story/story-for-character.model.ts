export class IStoryForCharacter {
    id: number | null;
    title: string = '';
    story: string | null;
}
export class StoryForCharacter implements IStoryForCharacter {
    id: number | null;
    title: string = '';
    story: string | null;

    constructor(initialValues: IStoryForCharacter) {
        Object.assign(this, initialValues);
    }
}
