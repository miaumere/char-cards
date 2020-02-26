import { IProfilePic } from '../../admin-panel/models/profile-pic.model';

import { ICharacterItem } from './character-item.model';

export interface ICharacterForListItem {
  id: number;
  charName: string;
  charSurname: string;
  profilePic: IProfilePic;
  archived: boolean;
}

export class CharacterForListItem implements ICharacterForListItem {
  id: number;
  charName: string;
  charSurname: string;
  profilePic: IProfilePic;
  archived: boolean;

  constructor(initialValues: ICharacterItem) {
    Object.assign(this, initialValues);
  }
}
