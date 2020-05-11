package com.meowmere.main.dto.story.chapters;

import java.util.ArrayList;

public class ChapterDTO {
    public Long id;
    public String chapterDesc;
    public String name;
    public ArrayList<Long> pagesIds;

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

    public ArrayList<Long> getPagesIds() {
        return pagesIds;
    }

    public void setPagesIds(ArrayList<Long> pagesIds) {
        this.pagesIds = pagesIds;
    }
}
