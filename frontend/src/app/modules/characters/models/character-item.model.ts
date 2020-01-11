import { ProfilePic } from '../../admin-panel/models/profile-pic.model';

export class CharacterItem {
  id: number;
  charName: string;
  charSurname: string;
  profilePic?: ProfilePic | null;
  archived: boolean;
}

export class CharacterForListItem {
  id: number;
  charName: string;
  charSurname: string;
  profilePic: ProfilePic;
  archived: boolean;
}
