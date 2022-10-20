import { StarringType } from 'src/app/modules/characters/models/starring-in/StarringType.enum';

export interface ChapterForCharacter {
    chapterId: number;
    chapterName: string | null;
    starringType: StarringType | null;
}
