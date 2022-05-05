export interface ICharacterPreferences {
    relcharId: number;
    relCharName: string;
    relCharSurname: string;
    relCharAvatar: string | null;
    range: number;
}

export class CharacterPreferences implements ICharacterPreferences {
    relcharId: number = 0;
    relCharName: string = '';
    relCharSurname: string = '';
    relCharAvatar: string | null = null;
    range: number = 0;

    get fullName() {
        return `${this.relCharName} ${this.relCharSurname}`;
    }

    constructor(initialValues: ICharacterPreferences) {
        Object.assign(this, initialValues);
    }
}
