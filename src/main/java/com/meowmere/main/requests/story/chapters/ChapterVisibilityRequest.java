package com.meowmere.main.requests.story.chapters;

public class ChapterVisibilityRequest {
    private Long chapterId;
    private Boolean visibility;

    public Long getChapterId() {
        return chapterId;
    }

    public void setChapterId(Long chapterId) {
        this.chapterId = chapterId;
    }

    public Boolean getVisibility() {
        return visibility;
    }

    public void setVisibility(Boolean visibility) {
        this.visibility = visibility;
    }
}
