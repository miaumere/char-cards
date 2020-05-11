package com.meowmere.main.dto.story.chapters;

public class ChapterDTO {
    public Long id;
    public String chapterDesc;
    public String name;
    public Integer pagesNumber;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getChapterDesc() {
        return chapterDesc;
    }

    public void setChapterDesc(String chapterDesc) {
        this.chapterDesc = chapterDesc;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPagesNumber() {
        return pagesNumber;
    }

    public void setPagesNumber(Integer pagesNumber) {
        this.pagesNumber = pagesNumber;
    }
}
