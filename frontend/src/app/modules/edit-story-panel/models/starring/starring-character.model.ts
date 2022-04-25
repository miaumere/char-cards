import { ICharacterItem } from 'src/app/modules/characters/models/character-item.model';

export interface IStarringCharacter {
    id: number | null;
    character: ICharacterItem | null;
    starringType: string;
}

export class StarringCharacter implements IStarringCharacter {
    id: number | null = null;
    character: ICharacterItem | null = null;
    starringType: string = '';

    constructor(initialValues: IStarringCharacter) {
        Object.assign(this, initialValues);
    }
}
