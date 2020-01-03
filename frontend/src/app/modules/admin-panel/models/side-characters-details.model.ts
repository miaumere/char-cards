import { Book } from './book.model';

export class SideCharacterDetails {
  externalId: number;
  sideCharacterName: string;
  sideCharacterSurname: string;
  sideCharacterDesc: string;
  books: Book[];
}
