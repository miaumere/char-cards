package com.meowmere.main.controllers;

import com.meowmere.main.requests.characters.character.ChangeCharacterStateRequest;
import com.meowmere.main.requests.characters.character.CreateCharacterRequest;
import com.meowmere.main.requests.characters.character.EditCharacterRequest;
import com.meowmere.main.requests.characters.image.ImageRenameRequest;
import com.meowmere.main.requests.characters.quotes.EditQuoteRequest;
import com.meowmere.main.requests.characters.quotes.NewQuoteForCharacterRequest;
import com.meowmere.main.requests.characters.relationship.EditRelationshipRequest;
import com.meowmere.main.requests.characters.relationship.RelationRequest;
import com.meowmere.main.requests.characters.stories.CreateStoryForCharRequest;
import com.meowmere.main.requests.characters.stories.EditStoryRequest;
import com.meowmere.main.services.CharactersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.ArrayList;


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
    public ResponseEntity getCharacterById(@PathVariable Long characterId) {
        return charactersService.getCharacter(characterId);
    }

    @GetMapping("/get-quotes")
    public ResponseEntity getQuotesForCharacter(@RequestParam Long id) {
        return charactersService.getAllQuotesForCharacter(id);
    }

    @GetMapping("/get-details")
    public ResponseEntity getDetailsForCharacter(@RequestParam Long id){
        return charactersService.getCharacterDetails(id);
    }

    @GetMapping("/get-relationships")
    public ResponseEntity getRelationshipsForCharacter(@RequestParam Long id) {
        return this.charactersService.getRelationships(id);
    }

    @GetMapping("/get-stories-for-character")
    public ResponseEntity getStoriesForCharacter(@RequestParam Long id) {
        return this.charactersService.getStoriesForCharacter(id);
    }

    @PostMapping("/new-character")
    public ResponseEntity createCharacter(@RequestBody CreateCharacterRequest request) {
        return charactersService.createCharacter(request);
    }

    @PostMapping("/new-quote")
    public ResponseEntity createQuoteForCharacter(@RequestBody NewQuoteForCharacterRequest newQuoteForCharacterRequest) {
        return charactersService.createQuoteForCharacter(newQuoteForCharacterRequest);
    }

    @PostMapping("/new-relationship")
    public ResponseEntity createRelationship(@RequestBody RelationRequest relationRequest) {
        return charactersService.createRelationship(relationRequest);
    }

    @PostMapping("/new-story")
    public ResponseEntity createStoryForCharacter(@RequestBody CreateStoryForCharRequest request) {
        return charactersService.createStoryForCharacter(request);
    }

    @PutMapping("/edit-character")
    public ResponseEntity editCharacter(@RequestBody EditCharacterRequest request,
                                        @RequestParam Boolean isDead) {
        return charactersService.editCharacter(request, isDead);
    }

    @PutMapping("/edit-story-indexes")
    public ResponseEntity editStoryIndexes(@RequestBody ArrayList<Long> storyIds, @RequestParam Long id) {
        return  charactersService.editStoryIndexes(storyIds, id);
    }

    @PatchMapping("/change-state")
    public ResponseEntity changeStateOfCharacter(@RequestBody ChangeCharacterStateRequest request){
        return charactersService.changeStatusForCharacter(request);
    }

    @PatchMapping("/edit-relationship")
    public ResponseEntity editRelationships(@RequestBody EditRelationshipRequest editRelationshipRequest){
        return charactersService.editRelationships(editRelationshipRequest);
    }

    @PatchMapping("/edit-story")
    public ResponseEntity editStory(@RequestBody EditStoryRequest request) {
        return charactersService.editStory(request);
    }

    @PostMapping("/new-images")
    public ResponseEntity newImages(MultipartHttpServletRequest multipartHttpServletRequest, @RequestParam Long id) {
        return charactersService.newImages(multipartHttpServletRequest, id);
    }

    @PatchMapping("/edit-quote")
    public ResponseEntity editQuote(@RequestBody EditQuoteRequest editQuoteRequest) {
        return charactersService.editQuote(editQuoteRequest);
    }

    @PatchMapping("/change-image-name")
    public ResponseEntity changeImageName(@RequestBody ImageRenameRequest request) {
        return charactersService.changeImageName(request);
    }

    @DeleteMapping("/delete-quote")
    public ResponseEntity deleteQuote(@RequestParam Long id) {
        return charactersService.deleteQuote(id);
    }

    @DeleteMapping("/delete-image")
    public ResponseEntity deleteImage(@RequestParam Long id) { return charactersService.deleteImage(id);}

    @DeleteMapping("/delete-relationship")
    public ResponseEntity deleteRelationship(@RequestParam Long characterId, @RequestParam Long relatedCharacterId)
    {return charactersService.deleteRelationshipsForCharacters(characterId, relatedCharacterId);}

    @DeleteMapping("/delete-story")
    public ResponseEntity deleteStory(@RequestParam Long id) { return charactersService.deleteStory(id);}

}
