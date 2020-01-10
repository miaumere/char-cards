export class SideCharacter {
  externalId: number;
  sideCharacterName: string;
  sideCharacterSurname: string;
  sideCharacterDesc: string;
}

export class SideCharacterForListItem {
  externalId: number;
  sideCharacterName: string;
  sideCharacterSurname: string;
  archived: boolean;
  profilePic: ProfilePic;
}

class ProfilePic {
  profilePic: string;
  extension: string;
}
