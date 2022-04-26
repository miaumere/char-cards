import { IProfilePic } from '../../admin-panel/models/images/profile-pic.model';

import { ICharacterItem } from './character-item.model';

export interface ICharacterForListItem {
    id: number;
    charName: string;
    fullName: string;

    charSurname: string;
    characterType: string;
    profilePic: IProfilePic | null;
    archived: boolean;
}

export class CharacterForListItem implements ICharacterForListItem {
    id: number = 0;
    charName: string = '';
    fullName: string = '';

    charSurname: string = '';
    profilePic: IProfilePic | null = null;
    characterType: string = '';
    archived: boolean = false;

    constructor(initialValues: ICharacterItem) {
        Object.assign(this, initialValues);
    }
}
