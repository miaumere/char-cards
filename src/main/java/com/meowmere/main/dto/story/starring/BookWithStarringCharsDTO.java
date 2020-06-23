package com.meowmere.main.dto.story.starring;

import com.meowmere.main.dto.story.books.BookDTO;

import java.util.ArrayList;

public class BookWithStarringCharsDTO {
    private BookDTO book;
    private ArrayList<ChaptersWithCharStarringTypeDTO> chapters;

    public BookDTO getBook() {
        return book;
    }

    public void setBook(BookDTO book) {
        this.book = book;
    }

    public ArrayList<ChaptersWithCharStarringTypeDTO> getChapters() {
        return chapters;
    }

    public void setChapters(ArrayList<ChaptersWithCharStarringTypeDTO> chapters) {
        this.chapters = chapters;
    }
}
