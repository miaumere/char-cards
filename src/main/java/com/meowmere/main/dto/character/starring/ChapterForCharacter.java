package com.meowmere.main.dto.character.starring;

import com.meowmere.main.entities.story.Chapter;
import com.meowmere.main.enums.StarringType;

public class ChapterForCharacter {
    private Long chapterId;
    private String chapterName;
    private StarringType starringType;

    public ChapterForCharacter() {

    }

    public ChapterForCharacter(Chapter chapter) {
        setChapterId(chapter.getExternalId());
        setChapterName(chapter.getName());

    }

    public Long getChapterId() {
        return chapterId;
    }

    public void setChapterId(Long chapterId) {
        this.chapterId = chapterId;
    }

    public String getChapterName() {
        return chapterName;
    }

    public void setChapterName(String chapterName) {
        this.chapterName = chapterName;
    }

    public StarringType getStarringType() {
        return starringType;
    }

    public void setStarringType(StarringType starringType) {
        this.starringType = starringType;
    }
}
