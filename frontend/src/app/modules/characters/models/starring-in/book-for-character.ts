import { IBook } from 'src/app/modules/edit-story-panel/models/books/book.model';
import { ChapterForCharacter } from './chapter-for-character.model';
export interface BookForCharacter {
    book: IBook;
    chapters: ChapterForCharacter[];
}
