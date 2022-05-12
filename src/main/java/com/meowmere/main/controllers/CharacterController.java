package com.meowmere.main.controllers;

import com.meowmere.main.dto.character.relation.RelationRequest;
import com.meowmere.main.requests.characters.character.ChangeCharacterStateRequest;
import com.meowmere.main.requests.characters.character.CreateCharacterRequest;
import com.meowmere.main.requests.characters.character.EditCharacterRequest;
import com.meowmere.main.requests.characters.image.ImageRenameRequest;
import com.meowmere.main.requests.characters.preference.PreferenceRequest;
import com.meowmere.main.requests.characters.quotes.UpsertQuoteRequest;
import com.meowmere.main.requests.characters.stories.StoryRequest;
import com.meowmere.main.services.CharactersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/characters/")
public class CharacterController {

    @Autowired
    CharactersService charactersService;

    @GetMapping("/get-characters")
    public ResponseEntity getCharactersList(HttpServletResponse response) throws InterruptedException {
        return charactersService.getNonArchivedCharacters();
    }

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

    // #region
    @GetMapping("/relations")
    public ResponseEntity getRelationsCharacter(@RequestParam Long id) {
        return this.charactersService.getRelations(id);
    }

    @GetMapping("/relations")
    public ResponseEntity getRelationsTreeData(@RequestParam Long id) {
        return this.charactersService.getRelations(id);
    }

    @PostMapping("/relations")
    public ResponseEntity upsertRelations(@RequestParam Long id, @RequestBody List<RelationRequest> request) {
        return this.charactersService.upsertRelations(request, id);
    }

    // #endregion



    @GetMapping("/get-stories-for-character")
    public ResponseEntity getStoriesForCharacter(@RequestParam Long id) {
        return this.charactersService.getStoriesForCharacter(id);
    }

    @GetMapping("/get-all-preferences-for-character")
    public ResponseEntity getPreferencesForCharacter(@RequestParam Long id) throws InterruptedException {
        return this.charactersService.getAllPreferencesForCharacter(id);
    }

    @GetMapping("/get-characters-historical-preferences")
    public  ResponseEntity getCharactersHistoricalPreferences(@RequestParam Long charId, @RequestParam Long relatedCharId){
        return this.charactersService.getHistoricalPreferencesForCharacter(charId, relatedCharId);
    }

    @PostMapping("/new-character")
    public ResponseEntity createCharacter(@RequestBody CreateCharacterRequest request) {
        return charactersService.createCharacter(request);
    }

    @PostMapping("/upsert-quote")
    public ResponseEntity upsertQuoteForCharacter(@RequestBody UpsertQuoteRequest request) {
        return charactersService.upsertQuote(request);
    }


    @PostMapping("/upsert-story")
    public ResponseEntity createStoryForCharacter(@RequestBody StoryRequest request) {
        return charactersService.upsertStoryForCharacter(request);
    }

    @PostMapping("/edit-preferences")
    public ResponseEntity editPreferences(@RequestBody PreferenceRequest preferenceRequest) {
        return charactersService.editPreferences(preferenceRequest);
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


    @PostMapping("/new-images")
    public ResponseEntity newImages(MultipartHttpServletRequest multipartHttpServletRequest, @RequestParam Long id) {
        return charactersService.newImages(multipartHttpServletRequest, id);
    }

    @PatchMapping("/change-image-name")
    public ResponseEntity changeImageName(@RequestBody ImageRenameRequest request) {
        return charactersService.changeImageName(request);
    }

    @PatchMapping("/change-images-order")
    public ResponseEntity changeImagesOrder(@RequestBody Long[] ids) {
        return charactersService.changeImagesOrder(ids);
    }

    @DeleteMapping("/delete-quote")
    public ResponseEntity deleteQuote(@RequestParam Long id) {
        return charactersService.deleteQuote(id);
    }

    @DeleteMapping("/delete-image")
    public ResponseEntity deleteImage(@RequestParam Long id) { return charactersService.deleteImage(id);}

    @DeleteMapping("/delete-story")
    public ResponseEntity deleteStory(@RequestParam Long id) { return charactersService.deleteStory(id);}

    @DeleteMapping("/delete-preference")
    public ResponseEntity deletePreference(@RequestParam Long id) {
        return charactersService.deletePreference(id);
    }
}
