export interface ICharacterItem {
    id: number;
    fullName: string;
    pseudonym: string;

    characterType: string;
    profilePic: string | null;
    archived: boolean;

    birthday: number | null;
}

export class CharacterItem implements ICharacterItem {
    id: number = 0;
    fullName: string = '';
    pseudonym: string = '';

    characterType: string = '';
    profilePic: string | null = null;
    archived: boolean = false;

    birthday: number | null = null;
    hasBirthdayToday: boolean = false;

    constructor(initialValues: ICharacterItem) {
        Object.assign(this, initialValues);

        if (initialValues.birthday) {
            const todayDate = new Date();

            const birthdayDate = new Date(initialValues.birthday);

            if (birthdayDate.getMonth() === todayDate.getMonth()) {
                this.hasBirthdayToday =
                    birthdayDate.getDate() === todayDate.getDate();
            }
        }
    }

    toString(): string {
        return this.fullName;
    }
}
