import { ICharacterItem } from 'src/app/modules/characters/models/character-item.model';

export interface IEditStarringCharacter {
    id: number | null;
    chapterId: number;
    characterId: number;
    starringType: string;
}
