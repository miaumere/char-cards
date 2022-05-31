export interface ICharacterPreferences {
    relCharId: number;
    relCharName: string;
    relCharSurname: string;
    relCharAvatar: any | null;
    range: number;
}

export class CharacterPreferences implements ICharacterPreferences {
    relCharId: number = 0;
    relCharName: string = '';
    relCharSurname: string = '';
    relCharAvatar: any | null = null;
    range: number = 0;

    get fullName() {
        return `${this.relCharName} ${this.relCharSurname}`;
    }

    constructor(initialValues: ICharacterPreferences) {
        Object.assign(this, initialValues);
    }
}
