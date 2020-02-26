export interface ISideCharacter {
  externalId: number;
  sideCharacterName: string;
  sideCharacterSurname: string;
  sideCharacterDesc: string;
}
export class SideCharacter implements ISideCharacter {
  externalId: number;
  sideCharacterName: string;
  sideCharacterSurname: string;
  sideCharacterDesc: string;

  constructor(initialValues: ISideCharacter) {
    Object.assign(this, initialValues);
  }
}
