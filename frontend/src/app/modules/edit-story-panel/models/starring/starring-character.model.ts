import { ICharacterItem } from 'src/app/modules/characters/models/character-item.model';

export interface IStarringCharacter {
  id: number;
  character: ICharacterItem;
  starringType: string;
}

export class StarringCharacter implements IStarringCharacter {
  id: number;
  character: ICharacterItem;
  starringType: string;

  constructor(initialValues: IStarringCharacter) {
    Object.assign(this, initialValues);
  }
}
