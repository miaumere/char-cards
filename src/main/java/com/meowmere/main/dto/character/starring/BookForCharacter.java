package com.meowmere.main.dto.character.starring;


import com.meowmere.main.dto.story.books.BookDTO;
import com.meowmere.main.entities.story.Book;

import java.util.ArrayList;
import java.util.List;

public class BookForCharacter {
    private BookDTO book;
    private List<ChapterForCharacter> chapters = new ArrayList<>();

    public BookDTO getBook() {
        return book;
    }

    public void setBook(Book book) {
        BookDTO bookDTO = new BookDTO();
        bookDTO.setId(book.getExternalId());
        bookDTO.setBookOrder(book.getBookOrder());
        bookDTO.setColor(book.getColor());
        bookDTO.setSymbol(book.getSymbol());
        bookDTO.setName(book.getName());

        this.book = bookDTO;
    }

    public List<ChapterForCharacter> getChapters() {
        return chapters;
    }

    public void setChapters(List<ChapterForCharacter> chapters) {
        this.chapters = chapters;
    }
}
