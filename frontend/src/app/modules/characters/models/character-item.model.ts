import { IProfilePic } from '../../admin-panel/models/images/profile-pic.model';

export interface ICharacterItem {
    id: number;
    charName: string;
    charSurname: string;
    characterType: string;
    profilePic: IProfilePic | null;
    archived: boolean;
}

export class CharacterItem implements ICharacterItem {
    id: number = 0;
    charName: string = '';
    charSurname: string = '';
    characterType: string = '';
    profilePic: IProfilePic | null = null;
    archived: boolean = false;

    get fullName() {
        return `${this.charName} ${this.charSurname}`;
    }

    constructor(initialValues: ICharacterItem) {
        Object.assign(this, initialValues);
    }
}
