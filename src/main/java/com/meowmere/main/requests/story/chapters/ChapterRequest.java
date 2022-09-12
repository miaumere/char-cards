package com.meowmere.main.requests.story.chapters;

import com.meowmere.main.dto.story.chapters.ChapterDTO;

public class ChapterRequest extends ChapterDTO {
    public Long id;
    public Long bookId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }
}
