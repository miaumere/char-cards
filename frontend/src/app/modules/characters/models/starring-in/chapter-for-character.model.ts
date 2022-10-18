import { StarringType } from 'src/app/modules/edit-story-panel/enums/StarringType.enum';
import { Book } from 'src/app/modules/edit-story-panel/models/books/book.model';

export interface ChapterForCharacter {
    chapterId: number;
    chapterName: string | null;
    starringType: StarringType | null;
}
