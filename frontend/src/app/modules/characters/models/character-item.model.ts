export interface ICharacterItem {
    id: number;
    fullName: string;

    charName: string;
    charSurname: string;
    characterType: string;
    profilePic: string | null;
    archived: boolean;
}

export class CharacterItem implements ICharacterItem {
    id: number = 0;
    fullName: string = '';

    charName: string = '';
    charSurname: string = '';
    characterType: string = '';
    profilePic: string | null = null;
    archived: boolean = false;

    constructor(initialValues: ICharacterItem) {
        Object.assign(this, initialValues);
    }

    toString(): string {
        return this.fullName;
    }
}
