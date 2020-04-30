import { IProfilePic } from '../../admin-panel/models/images/profile-pic.model';

import { ICharacterItem } from './character-item.model';

export interface ICharacterForListItem {
  id: number;
  charName: string;
  charSurname: string;
  characterType: string;
  profilePic: IProfilePic;
  archived: boolean;
}

export class CharacterForListItem implements ICharacterForListItem {
  id: number;
  charName: string;
  charSurname: string;
  profilePic: IProfilePic;
  characterType: string;
  archived: boolean;

  constructor(initialValues: ICharacterItem) {
    Object.assign(this, initialValues);
  }
}
