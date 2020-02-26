import { IBook } from './book.model';

export interface ISideCharacterDetails {
  externalId: number;
  sideCharacterName: string;
  sideCharacterSurname: string;
  sideCharacterDesc: string;
  books: IBook[];
}

export class SideCharacterDetails {
  externalId: number;
  sideCharacterName: string;
  sideCharacterSurname: string;
  sideCharacterDesc: string;
  books: IBook[];
}
