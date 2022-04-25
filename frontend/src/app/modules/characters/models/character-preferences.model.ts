import { IProfilePic } from '../../admin-panel/models/images/profile-pic.model';

export interface ICharacterPreferences {
    relcharId: number;
    relCharName: string;
    relCharSurname: string;
    relCharAvatar: IProfilePic | null;
    range: number;
}

export class CharacterPreferences implements ICharacterPreferences {
    relcharId: number = 0;
    relCharName: string = '';
    relCharSurname: string = '';
    relCharAvatar: IProfilePic | null = null;
    range: number = 0;

    get fullName() {
        return `${this.relCharName} ${this.relCharSurname}`;
    }

    constructor(initialValues: ICharacterPreferences) {
        Object.assign(this, initialValues);
    }
}
