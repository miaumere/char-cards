import { IRelationship } from './relationships.model';

export interface ISideCharacter {
  externalId: number;
  sideCharacterName: string;
  sideCharacterSurname: string;
  sideCharacterDesc: string;
  relationships: IRelationship[];
}
export class SideCharacter implements ISideCharacter {
  externalId: number;
  sideCharacterName: string;
  sideCharacterSurname: string;
  sideCharacterDesc: string;
  relationships: IRelationship[];

  constructor(initialValues: ISideCharacter) {
    Object.assign(this, initialValues);
  }
}
