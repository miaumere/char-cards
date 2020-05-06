package com.meowmere.main.controllers;

import com.meowmere.main.requests.story.books.CreateBookRequest;
import com.meowmere.main.requests.story.books.EditBookRequest;
import com.meowmere.main.services.story.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/new-book")
    public ResponseEntity createBook(@RequestBody CreateBookRequest request) {return storyService.createBook(request);}

    @PutMapping("/edit-book")
    public ResponseEntity editBook(@RequestBody EditBookRequest request) {return storyService.editBook(request);}

    @PatchMapping("edit-book-order")
    public ResponseEntity editBookOrder(@RequestBody ArrayList<Long> request)
    {return storyService.editBookOrder(request);}

    @DeleteMapping("/delete-book")
    public ResponseEntity deleteBook(@RequestParam Long id) {return storyService.deleteBook(id);}
}
