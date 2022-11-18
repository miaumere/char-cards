package com.meowmere.main.dto.character.starring;


import com.meowmere.main.dto.story.books.BookDTO;
import com.meowmere.main.entities.story.Book;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

public class BookForCharacter {
    @Getter
    @Setter
    private BookDTO book;
    @Getter
    @Setter
    private List<ChapterForCharacter> chapters = new ArrayList<>();

    public void setBook(Book book) {
        BookDTO bookDTO = new BookDTO();
        bookDTO.setId(book.getExternalId());
        bookDTO.setBookOrder(book.getBookOrder());
        bookDTO.setColor(book.getColor());
        bookDTO.setSymbol(book.getSymbol());
        bookDTO.setName(book.getName());

        this.book = bookDTO;
    }


}
