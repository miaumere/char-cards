package com.meowmere.main.dto.character.starring;

import com.meowmere.main.entities.story.Chapter;
import com.meowmere.main.enums.StarringType;
import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
public class ChapterForCharacter {
    @Getter
    @Setter
    @NonNull
    private Long chapterId;
    @Getter
    @Setter
    @NonNull
    private String chapterName;
    @Getter
    @Setter
    private StarringType starringType;

    public ChapterForCharacter(Chapter chapter) {
        setChapterId(chapter.getExternalId());
        setChapterName(chapter.getName());
    }
}
