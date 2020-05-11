package com.meowmere.main.controllers;

import com.meowmere.main.requests.story.books.CreateBookRequest;
import com.meowmere.main.requests.story.books.EditBookRequest;
import com.meowmere.main.requests.story.chapters.ChapterRequest;
import com.meowmere.main.services.story.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/stories/")
public class StoryController {

    @Autowired
    StoryService storyService;

    @GetMapping("/get-all-books")
    public ResponseEntity getBooks() {return storyService.getBooks();}

    @GetMapping("/get-chapters-for-book")
    public ResponseEntity getChaptersForBook(@RequestParam Long id) {return  storyService.getChaptersForBook(id);}

//    @GetMapping("/get-pages-for-chapters")
//    public ResponseEntity getPages(@RequestParam Long id) {
//        HttpHeaders httpHeaders = new HttpHeaders();
//                httpHeaders.setContentType(MediaType.APPLICATION_JSON);
//        return storyService.getPagesForChapter(id, httpHeaders);}

    @GetMapping("/get-images/{chapterId}/{pageNumber}")
    public ResponseEntity getImages(@PathVariable Long chapterId, @PathVariable Integer pageNumber) {
        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return storyService.getPagesForChapter(chapterId, pageNumber, httpHeaders);
    }


    @PostMapping("/new-book")
    public ResponseEntity createBook(@RequestBody CreateBookRequest request) {return storyService.createBook(request);}

//    @PostMapping("/new-pages")
//    public ResponseEntity createNewPages(MultipartHttpServletRequest multipartHttpServletRequest,
//                                         @RequestParam Long chapterId,
//                                         @RequestParam Long bookId
//                                         ){
//        return storyService.
//    }

    @PostMapping("/edit-chapter")
    public ResponseEntity editChapter(@RequestBody ChapterRequest request) {return storyService.editChapter(request);}

    @PutMapping("/edit-book")
    public ResponseEntity editBook(@RequestBody EditBookRequest request) {return storyService.editBook(request);}

    @PatchMapping("edit-book-order")
    public ResponseEntity editBookOrder(@RequestBody ArrayList<Long> request)
    {return storyService.editBookOrder(request);}

    @PatchMapping("edit-chapter-order")
    public ResponseEntity editChapterOrder(
            @RequestBody ArrayList<Long> request,
            @RequestParam Long bookId) {
        return storyService.editChapterOrder(request, bookId);
    }

//    @PatchMapping("/edit-pages-order")
//    public ResponseEntity editPagesOrder(@RequestBody ArrayList<Long> request, @RequestParam Long bookId, @RequestParam Long chapterId){
//        return storyService.
//    }

    @DeleteMapping("/delete-book")
    public ResponseEntity deleteBook(@RequestParam Long id) {return storyService.deleteBook(id);}

    @DeleteMapping("/delete-chapter")
    public ResponseEntity deleteChapter(@RequestParam Long id) {return storyService.deleteChapter(id);}

    @DeleteMapping("/delete-page")
    public ResponseEntity deletePage(@RequestParam Long id) {return storyService.deletePage(id);}
}
