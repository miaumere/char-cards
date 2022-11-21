package com.meowmere.main.requests.story.chapters;

import com.meowmere.main.dto.story.chapters.ChapterDTO;
import lombok.Getter;
import lombok.Setter;

public class ChapterRequest extends ChapterDTO {
    @Getter
    @Setter
    private Long id;
    @Getter
    @Setter
    private Long bookId;

}
