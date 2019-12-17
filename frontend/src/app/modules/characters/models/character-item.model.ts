export class CharacterItem {
  id: number;
  charName: string;
  charSurname: string;
  profilePic?: string;
}

export class CharacterForListItem {
  id: number;
  charName: string;
  charSurname: string;
  archived: boolean;
}
