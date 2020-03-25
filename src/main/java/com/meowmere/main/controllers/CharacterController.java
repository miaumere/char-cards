package com.meowmere.main.controllers;

import com.meowmere.main.dto.character.titles.TitleDTO;
import com.meowmere.main.requests.characters.character.ChangeCharacterStateRequest;
import com.meowmere.main.requests.characters.character.EditCharacterRequest;
import com.meowmere.main.requests.characters.quotes.EditQuoteRequest;
import com.meowmere.main.requests.characters.quotes.NewQuoteForCharacterRequest;
import com.meowmere.main.requests.characters.stories.CreateStoryForCharRequest;
import com.meowmere.main.requests.characters.stories.EditStoryRequest;
import com.meowmere.main.requests.characters.titles.EditTitleRequest;
import com.meowmere.main.requests.characters.titles.NewTitleRequest;
import com.meowmere.main.services.characters.CharactersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api/characters/")
public class CharacterController {

    @Autowired
    CharactersService charactersService;

    @GetMapping("/get-characters")
    public ResponseEntity getCharactersList(){ return charactersService.findCharList(); }

    @GetMapping("/get-all-characters")
    public ResponseEntity getEveryCharacter() { return charactersService.getEveryCharacter();}

    @GetMapping("/get-character/{characterId}")
    public ResponseEntity getCharacterById(@PathVariable Long characterId) throws IOException {
        return charactersService.findByExternalId(characterId);
    }

    @GetMapping("/get-quotes")
    public ResponseEntity getQuotesForCharacter(@RequestParam Long id) {
        return charactersService.getAllQuotesForCharacter(id);
    }

    @GetMapping("/get-details")
    public ResponseEntity getDetailsForCharacter(@RequestParam Long id){
        return charactersService.getCharacterDetails(id);
    }

    @GetMapping("/chars-without-relations")
    public ResponseEntity getCharsWithoutRelationsForSideChar(){
        return charactersService.getCharactersWithoutRelations();
    }

    @PostMapping("/new-character")
    public ResponseEntity createCharacter(MultipartHttpServletRequest multipartHttpServletRequest) {
        return charactersService.createCharacter(multipartHttpServletRequest);
    }

    @PostMapping("/new-quote")
    public ResponseEntity createQuoteForCharacter(@RequestBody NewQuoteForCharacterRequest newQuoteForCharacterRequest) {
        return charactersService.createQuoteForCharacter(newQuoteForCharacterRequest);
    }

    @PutMapping("/edit-character")
    public ResponseEntity editCharacter(@RequestBody EditCharacterRequest request,
                                        @RequestParam Boolean isDead) {
        return charactersService.editCharacter(request, isDead);
    }

    @PatchMapping("/change-state")
    public ResponseEntity changeStateOfCharacter(@RequestBody ChangeCharacterStateRequest request){
        return charactersService.changeStatusForCharacter(request);
    }

    @GetMapping("/get-titles")
    public ResponseEntity getStoryTitles(){
        return charactersService.getTitles();
    }

    @GetMapping("/get-stories")
    public ResponseEntity getStoriesForChar(@RequestParam Long id) {
        return this.charactersService.getStoriesForCharacter(id);
    }

    @PostMapping("/new-stories")
    public ResponseEntity createStoryForCharacter(@RequestBody CreateStoryForCharRequest createStoryForCharRequest){
        return charactersService.createStoryForCharacter(createStoryForCharRequest);
    }

    @PostMapping("/new-images")
    public ResponseEntity newImages(MultipartHttpServletRequest multipartHttpServletRequest, @RequestParam Long id) {
        return charactersService.newImages(multipartHttpServletRequest, id);
    }

    @PostMapping("/new-title")
    public ResponseEntity newTitle(@RequestBody NewTitleRequest request) {
        return charactersService.newTitle(request);
    }

    @PatchMapping("/edit-quote")
    public ResponseEntity editQuote(@RequestBody EditQuoteRequest editQuoteRequest) {
        return charactersService.editQuote(editQuoteRequest);
    }

    @PatchMapping("/edit-title")
    public ResponseEntity editTitle(@RequestBody EditTitleRequest editTitleRequest){
        return charactersService.editTitle(editTitleRequest);
    }

    @PatchMapping("/edit-story")
    public ResponseEntity editStory(@RequestBody EditStoryRequest request) {
        return charactersService.editStory(request);
    }

    @PatchMapping("/set-title-sequence")
    public ResponseEntity setTitlesSequence(@RequestBody List<TitleDTO> request){
        return charactersService.setTitlesSequence(request);
    }

    @DeleteMapping("/delete-quote")
    public ResponseEntity deleteQuote(@RequestParam Long id) {
        return charactersService.deleteQuote(id);
    }

    @DeleteMapping("/delete-title")
    public ResponseEntity deleteTitle(@RequestParam Long id) {
        return charactersService.deleteTitle(id);
    }

    @DeleteMapping("/delete-story")
    public ResponseEntity deleteStory(@RequestParam Long id) {
        return charactersService.deleteStory(id);
    }

    @DeleteMapping("/delete-image")
    public ResponseEntity deleteImage(@RequestParam Long id) { return charactersService.deleteImage(id);}
}
