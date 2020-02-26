import { IProfilePic } from '../../admin-panel/models/profile-pic.model';

export interface ICharacterItem {
  id: number;
  charName: string;
  charSurname: string;
  profilePic: IProfilePic | null;
  archived: boolean;
}

export class CharacterItem implements ICharacterItem {
  id: number;
  charName: string;
  charSurname: string;
  profilePic: IProfilePic | null;
  archived: boolean;

  constructor(initialValues: ICharacterItem) {
    Object.assign(this, initialValues);
  }
}
