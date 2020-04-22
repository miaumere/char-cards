import { CharType } from './../../admin-panel/enums/character-type.enum';
import { IProfilePic } from '../../admin-panel/models/profile-pic.model';

export interface ICharacterItem {
  id: number;
  charName: string;
  charSurname: string;
  characterType: string;
  profilePic: IProfilePic | null;
  archived: boolean;
}

export class CharacterItem implements ICharacterItem {
  id: number;
  charName: string;
  charSurname: string;
  characterType: string;
  profilePic: IProfilePic | null;
  archived: boolean;

  get fullName() {
    return `${this.charName} ${this.charSurname}`;
  }

  constructor(initialValues: ICharacterItem) {
    Object.assign(this, initialValues);
  }



}
