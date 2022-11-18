package com.meowmere.main.dto.story.chapters;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

public class ChapterDTO {
    @Getter
    @Setter
    private Long id;
    @Getter
    @Setter
    private String chapterDesc;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private ArrayList<Long> pagesIds;
    @Getter
    @Setter
    protected Long createDate;
    @Getter
    @Setter
    protected String actionTime;
    @Getter
    @Setter
    protected String actionPlace;
    @Getter
    @Setter
    private Long bookId;
    @Getter
    @Setter
    private Boolean visible;


}
