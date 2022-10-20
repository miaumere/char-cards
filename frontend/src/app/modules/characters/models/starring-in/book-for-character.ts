import { IBook } from 'src/app/modules/pages/models/books/book.model';
import { ChapterForCharacter } from './chapter-for-character.model';
export interface BookForCharacter {
    book: IBook;
    chapters: ChapterForCharacter[];
}
