import { IProfilePic } from '../../admin-panel/models/images/profile-pic.model';

export interface ICharacterPreferences {
  relCharId: number;
  relCharName: string;
  relCharSurname: string;
  relCharAvatar: IProfilePic | null;
  range: number;
}

export class CharacterPreferences implements ICharacterPreferences {
  relCharId: number;
  relCharName: string;
  relCharSurname: string;
  relCharAvatar: IProfilePic | null;
  range: number;


  get fullName() {
    return `${this.relCharName} ${this.relCharSurname}`;
  }

  constructor(initialValues: ICharacterPreferences) {
    Object.assign(this, initialValues);
  }
}
