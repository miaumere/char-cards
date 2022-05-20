import { ICharacterItem } from './character-item.model';

export interface ICharacterForListItem {
    id: number;
    charName: string;
    fullName: string;
    pseudonym: string;

    charSurname: string;
    characterType: string;
    profilePic: string | null;
    archived: boolean;
}

export class CharacterForListItem implements ICharacterForListItem {
    id: number = 0;
    charName: string = '';
    fullName: string = '';
    pseudonym: string = '';

    charSurname: string = '';
    profilePic: string | null = null;
    characterType: string = '';
    archived: boolean = false;

    constructor(initialValues: ICharacterItem) {
        Object.assign(this, initialValues);
    }
}
