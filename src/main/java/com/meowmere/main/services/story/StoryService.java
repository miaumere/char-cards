package com.meowmere.main.services.story;

import com.meowmere.main.dto.story.books.BookDTO;
import com.meowmere.main.entities.story.Book;
import com.meowmere.main.enums.AvailableIcon;
import com.meowmere.main.repositories.story.BookRepository;
import com.meowmere.main.requests.story.books.CreateBookRequest;
import com.meowmere.main.requests.story.books.EditBookRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class StoryService {
    @Autowired
    BookRepository bookRepository;

    public ResponseEntity getBooks() {
        ModelMapper modelMapper = new ModelMapper();
        List<Book> books = bookRepository.findAll(Sort.by(Sort.Direction.ASC, "bookOrder"));
        ArrayList<BookDTO> bookDTOS = new ArrayList<>();
        if(books != null) {
            for (Book book: books) {
                BookDTO bookDTO = modelMapper.map(book, BookDTO.class);
                bookDTOS.add(bookDTO);
            }
        }
        return new ResponseEntity(bookDTOS, HttpStatus.OK);
    }

    public ResponseEntity createBook(CreateBookRequest request) {
        Book book = new Book();
        Long booksNumber = bookRepository.count();
        book.setBookOrder(booksNumber+1);
        book.setColor(request.getColor());
        book.setName(request.getName());
        if(request.getIcon() != null) {
            book.setIcon(AvailableIcon.valueOf(request.getIcon()));
        }

        bookRepository.saveAndFlush(book);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity deleteBook(Long id) {
        Book book = bookRepository.getOne(id);
        if(book != null) {
            bookRepository.delete(book);
        }
        return  new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity editBook(EditBookRequest request) {
        Book book = bookRepository.getOne(request.getId());
        if (book == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        if(request.getIcon() != null) {
            book.setIcon(AvailableIcon.valueOf(request.getIcon()));
        }
        book.setName(request.getName());
        book.setColor(request.getColor());
        bookRepository.saveAndFlush(book);

        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity editBookOrder(ArrayList<Long> booksIds){
        List<Book> books = bookRepository.findAll();
        HashMap<Long, Long> booksFromDb = new HashMap<>();

        for (int i = 0; i < books.size() ; i++) {
            Book book = books.get(i);
            booksFromDb.put(book.getExternalId(), book.getBookOrder());
        }
        booksFromDb.forEach((key, value) -> {
            Book book = bookRepository.getOne(key);
            book.setBookOrder(9999 + value);
            bookRepository.saveAndFlush(book);
        });

        for (int i = 0; i < booksIds.size() ; i++) {
            Book book = bookRepository.getOne(booksIds.get(i));
            book.setBookOrder(Long.valueOf(i));
            bookRepository.saveAndFlush(book);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
