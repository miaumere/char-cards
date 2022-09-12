package com.meowmere.main.dto.story.chapters;

import java.util.ArrayList;

public class ChapterDTO {
    private Long id;
    private String chapterDesc;
    private String name;
    private ArrayList<Long> pagesIds;
    protected Long createDate;
    protected String actionTime;
    protected String actionPlace;

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

    public Long getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Long createDate) {
        this.createDate = createDate;
    }

    public String getActionTime() {
        return actionTime;
    }

    public void setActionTime(String actionTime) {
        this.actionTime = actionTime;
    }

    public String getActionPlace() {
        return actionPlace;
    }

    public void setActionPlace(String actionPlace) {
        this.actionPlace = actionPlace;
    }
}
