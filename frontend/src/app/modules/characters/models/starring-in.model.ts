import { Book } from 'src/app/modules/edit-story-panel/models/books/book.model';
import { IChapterWithStarringType } from './chapter-with-starring-type.model';
export interface IStarringIn {
  book: Book;
  chapters: IChapterWithStarringType[];
}
