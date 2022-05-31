export interface ICharacterPreferences {
    id: number;
    fullname: string;
    profilePic: string;
    range: number;
}

export class CharacterPreferences implements ICharacterPreferences {
    id: number = 0;
    fullname: string = '';
    profilePic: string = '';
    range: number = 0;

    constructor(initialValues: ICharacterPreferences) {
        Object.assign(this, initialValues);
    }
}
