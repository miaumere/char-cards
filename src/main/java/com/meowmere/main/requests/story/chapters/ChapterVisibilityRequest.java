package com.meowmere.main.requests.story.chapters;

import lombok.Getter;
import lombok.Setter;

public class ChapterVisibilityRequest {
    @Getter
    @Setter
    private Long chapterId;
    @Getter
    @Setter
    private Boolean visibility;

}
