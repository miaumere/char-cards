package com.meowmere.main.services.story;

import com.meowmere.main.dto.story.books.BookDTO;
import com.meowmere.main.dto.story.chapters.ChapterDTO;
import com.meowmere.main.entities.story.Book;
import com.meowmere.main.entities.story.Chapter;
import com.meowmere.main.entities.story.Page;
import com.meowmere.main.enums.AvailableIcon;
import com.meowmere.main.repositories.story.BookRepository;
import com.meowmere.main.repositories.story.ChapterRepository;
import com.meowmere.main.repositories.story.PageRepository;
import com.meowmere.main.requests.story.books.CreateBookRequest;
import com.meowmere.main.requests.story.books.EditBookRequest;
import com.meowmere.main.requests.story.chapters.ChapterRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
public class StoryService {
    @Autowired
    BookRepository bookRepository;
    @Autowired
    ChapterRepository chapterRepository;
    @Autowired
    PageRepository pageRepository;
    @Autowired
    ResourceLoader resourceLoader;


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

    public ResponseEntity getChaptersForBook(Long bookId) {
        ArrayList<Chapter> chapters = chapterRepository.getChaptersForBook(bookId);
        ArrayList<ChapterDTO> chapterDTOS = new ArrayList<>();
        if(chapters != null) {
            ModelMapper modelMapper = new ModelMapper();
            for (Chapter chapter: chapters) {
            ChapterDTO chapterDTO = modelMapper.map(chapter, ChapterDTO.class);
            chapterDTO.setPagesNumber(chapter.getPages().size());
            chapterDTOS.add(chapterDTO);
            }
        }

        return new ResponseEntity(chapterDTOS, HttpStatus.OK);
    }

    public ResponseEntity getPagesForChapter(Long chapterId, Integer pageNumber) {
        byte[] bytes = new byte[]{};
            Page page = pageRepository.getPageByPageNumber(pageNumber, chapterId);
            if(page != null) {
                try {
                    String uri = "C:\\tmp\\story\\";
                    Resource resource = resourceLoader.getResource("file:" + uri);
                    File file = resource.getFile();
                    File[] images = file.listFiles();

                    File image  = Arrays
                            .stream(images)
                            .filter(x -> Objects.equals(page.getFileLocation(), x.getName()))
                            .findFirst()
                            .orElse(null);
                bytes = FileCopyUtils.copyToByteArray(image);
                }catch (IOException e) {
                }
            }


        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity(bytes, httpHeaders, HttpStatus.OK);
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

    public ResponseEntity editChapter(ChapterRequest request) {
        Book book = bookRepository.getOne(request.getBookId());
        if(book == null) {
            return  new ResponseEntity("Nie istnieje szkicownik o podanym id.",HttpStatus.NOT_FOUND);
        }
        if(request.getId() == null) {
            Chapter chapter = new Chapter();
            chapter.setBook(book);
            chapter.setChapterDesc(request.getChapterDesc());
            chapter.setName(request.getName());

            Integer chaptersForBookSize = chapterRepository.getChaptersForBook(request.getBookId()).size();
            chapter.setChapterNumber(chaptersForBookSize);

            chapterRepository.saveAndFlush(chapter);
            return new ResponseEntity(HttpStatus.CREATED);
        }
        Chapter chapter = chapterRepository.getOne(request.getId());
        if(chapter == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        chapter.setName(request.getName());
        chapter.setChapterDesc(request.getChapterDesc());
        chapterRepository.saveAndFlush(chapter);


        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity deleteBook(Long id) {
        Book book = bookRepository.getOne(id);
        if(book != null) {
            bookRepository.delete(book);
        }
        return  new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity deleteChapter(Long id) {
        Chapter chapter = chapterRepository.getOne(id);
        if(chapter != null) {
            chapterRepository.delete(chapter);
        }
        return  new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity deletePage(Integer chapterOrder, Long chapterId) {
        Page page = pageRepository.getPageByPageNumber(chapterOrder, chapterId);

        if(page != null) {
            String uri = "C:\\tmp\\story\\";
            Resource resource = resourceLoader.getResource("file:" + uri);
        try {
            File file = resource.getFile();
            File[] images = file.listFiles();

            File image  = Arrays
                    .stream(images)
                    .filter(x -> Objects.equals(page.getFileLocation(), x.getName()))
                    .findFirst()
                    .orElse(null);
            image.delete();
            pageRepository.delete(page);

            ArrayList<Page> pagesFromDb = pageRepository.getPagesForChapter(chapterId);
            for (int i = 0; i < pagesFromDb.size(); i++) {
                pagesFromDb.get(i).setPageNumber(i);
                pageRepository.saveAndFlush(pagesFromDb.get(i));
            }


        } catch (IOException e) {
        }
        }

        return new ResponseEntity(HttpStatus.OK);
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

    public ResponseEntity editChapterOrder(ArrayList<Long> chapterIds, Long bookId){
        List<Chapter> chapters = chapterRepository.getChaptersForBook(bookId);
        HashMap<Long, Integer> booksFromDb = new HashMap<>();

        for (int i = 0; i < chapters.size() ; i++) {
            Chapter chapter = chapters.get(i);
            booksFromDb.put(chapter.getExternalId(), chapter.getChapterNumber());
        }
        booksFromDb.forEach((key, value) -> {
            Chapter chapter = chapterRepository.getOne(key);
            chapter.setChapterNumber(9999 + value);
            chapterRepository.saveAndFlush(chapter);
        });

        for (int i = 0; i < chapterIds.size() ; i++) {
            Chapter chapter = chapterRepository.getOne(chapterIds.get(i));
            chapter.setChapterNumber(i);
            chapterRepository.saveAndFlush(chapter);
        }

        return new ResponseEntity(HttpStatus.OK);
    }
}
