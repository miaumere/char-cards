package com.meowmere.main.controllers;

import com.meowmere.main.dto.story.books.BookDTO;
import com.meowmere.main.requests.characters.character.ChangeCharacterStateRequest;
import com.meowmere.main.requests.characters.stories.EditStarringCharacterRequest;
import com.meowmere.main.requests.story.chapters.ChapterRequest;
import com.meowmere.main.requests.story.chapters.ChapterVisibilityRequest;
import com.meowmere.main.services.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

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

    @GetMapping("/get-images/{chapterId}/{pageNumber}")
    public ResponseEntity getImages(@PathVariable Long chapterId, @PathVariable Integer pageNumber) {
        return storyService.getPagesForChapter(chapterId, pageNumber);
    }

    @GetMapping("/get-starring-characters")
    public ResponseEntity getStarringCharacters(@RequestParam Long chapterId){
        return storyService.getStarringCharactersForChapter(chapterId);
    }

    @GetMapping("/get-chapters-with-characters")
    public ResponseEntity getChaptersWithCharacters(@RequestParam Long id) {
        return storyService.getChaptersWithCharactersForBook(id);
    }

    @PostMapping("upsert-book")
    public ResponseEntity upsertBook(@RequestBody BookDTO request) {
        return storyService.upsertBook(request);
    }


    @PostMapping("/new-pages")
    public ResponseEntity createNewPages(MultipartHttpServletRequest multipartHttpServletRequest,
                                         @RequestParam Long chapterId
                                         ){
        return storyService.createPages(multipartHttpServletRequest, chapterId);
    }

    @PostMapping("/edit-starring-character")
    public ResponseEntity editStarringCharactersInChapter(@RequestBody EditStarringCharacterRequest request) {
        return storyService.editStarringCharacters(request);
    }

    @PostMapping("/edit-chapter")
    public ResponseEntity editChapter(@RequestBody ChapterRequest request) {return storyService.upsertChapter(request);}

    @PatchMapping("edit-book-order")
    public ResponseEntity editBookOrder(@RequestBody ArrayList<Long> request)
    {return storyService.editBookOrder(request);}

    @PatchMapping("edit-chapter-order")
    public ResponseEntity editChapterOrder(
            @RequestBody ArrayList<Long> request,
            @RequestParam Long bookId) {
        return storyService.editChapterOrder(request, bookId);
    }

    @PatchMapping("/edit-pages-order")
    public ResponseEntity editPagesOrder(@RequestBody ArrayList<Long> request){
        return storyService.editPagesOrder(request);
    }

    @PatchMapping("/change-visibility")
    public ResponseEntity changeChapterVisibility(@RequestBody ChapterVisibilityRequest request){
        return storyService.changeChapterVisibility(request);
    }

    @DeleteMapping("/delete-book")
    public ResponseEntity deleteBook(@RequestParam Long id) {return storyService.deleteBook(id);}

    @DeleteMapping("/delete-chapter")
    public ResponseEntity deleteChapter(@RequestParam Long id) {return storyService.deleteChapter(id);}

    @DeleteMapping("/delete-page")
    public ResponseEntity deletePage(@RequestParam Long pageId)
    {return storyService.deletePage(pageId);}

    @DeleteMapping("/delete-char-from-chapter")
    public ResponseEntity deleteStarringCharacterFromChapter(@RequestParam Long id)
    {return  storyService.deleteStarringCharacterFromChapter(id);}}
