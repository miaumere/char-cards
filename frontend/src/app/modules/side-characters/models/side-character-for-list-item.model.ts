import { IProfilePic } from '../../admin-panel/models/profile-pic.model';

export interface ISideCharacterForListItem {
  externalId: number;
  sideCharacterName: string;
  sideCharacterSurname: string;
  archived: boolean;
  profilePic: IProfilePic;
}
export class SideCharacterForListItem {
  externalId: number;
  sideCharacterName: string;
  sideCharacterSurname: string;
  archived: boolean;
  profilePic: IProfilePic;

  constructor(initialValues: ISideCharacterForListItem) {
    Object.assign(this, initialValues);
  }
}
