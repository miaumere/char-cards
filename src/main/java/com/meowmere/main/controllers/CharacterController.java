package com.meowmere.main.controllers;

import com.meowmere.main.dto.character.relation.CoordinatesRequest;
import com.meowmere.main.dto.character.relation.RelationRequest;
import com.meowmere.main.requests.characters.character.ChangeCharacterStateRequest;
import com.meowmere.main.requests.characters.character.EditCharacterRequest;
import com.meowmere.main.requests.characters.image.ImageRenameRequest;
import com.meowmere.main.requests.characters.preference.PreferenceRequest;
import com.meowmere.main.requests.characters.quotes.UpsertQuoteRequest;
import com.meowmere.main.services.CharactersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@RestController
@RequestMapping("/api/characters/")
public class CharacterController {

    @Autowired
    CharactersService charactersService;


    @GetMapping("/get-all-characters")
    public ResponseEntity getEveryCharacter(HttpServletRequest request) {
        return charactersService.getEveryCharacter(request);
    }

    @GetMapping("/get-character/{characterId}")
    public ResponseEntity getCharacterById(@PathVariable Long characterId) {
        return charactersService.getCharacter(characterId);
    }

    @GetMapping("/get-quotes")
    public ResponseEntity getQuotesForCharacter(@RequestParam Long id) {
        return charactersService.getAllQuotesForCharacter(id);
    }

    // #region
    @GetMapping("/relations")
    public ResponseEntity getRelationsCharacter(@RequestParam Long id) {
        return this.charactersService.getRelations(id);
    }

    @GetMapping("/relations-tree-data")
    public ResponseEntity getRelationsTreeData(@RequestParam Long id) {
        return this.charactersService.getRelationsTreeData(id);
    }

    @PostMapping("/relations")
    public ResponseEntity upsertRelations(@RequestParam Long id, @RequestBody List<RelationRequest> request) {
        return this.charactersService.upsertRelations(request, id);
    }

    @PostMapping("/coords")
    public ResponseEntity upsertCoords(@RequestParam Long id, @RequestBody List<CoordinatesRequest> request) {
        return this.charactersService.upsertCoords(id, request);
    }

    // #endregion

    @GetMapping("/get-all-preferences-for-character")
    public ResponseEntity getPreferencesForCharacter(@RequestParam Long id) throws InterruptedException {
        return this.charactersService.getAllPreferencesForCharacter(id);
    }

    @GetMapping("/get-characters-historical-preferences")
    public ResponseEntity getCharactersHistoricalPreferences(@RequestParam Long charId, @RequestParam Long relatedCharId) {
        return this.charactersService.getHistoricalPreferencesForCharacter(charId, relatedCharId);
    }

    @PostMapping("/upsert-quote")
    public ResponseEntity upsertQuoteForCharacter(@RequestBody UpsertQuoteRequest request) {
        return charactersService.upsertQuote(request);
    }


    @PostMapping("/edit-preferences")
    public ResponseEntity editPreferences(@RequestBody PreferenceRequest preferenceRequest) {
        return charactersService.editPreferences(preferenceRequest);
    }

    @PostMapping("/character")
    public ResponseEntity upsertCharacter(@RequestBody EditCharacterRequest request) {
        return charactersService.upsertCharacter(request);
    }

    @PatchMapping("/change-state")
    public ResponseEntity changeStateOfCharacter(@RequestBody ChangeCharacterStateRequest request) {
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
    public ResponseEntity deleteImage(@RequestParam Long id) {
        return charactersService.deleteImage(id);
    }

    @DeleteMapping("/delete-preference")
    public ResponseEntity deletePreference(@RequestParam Long id) {
        return charactersService.deletePreference(id);
    }

    @DeleteMapping("/delete-character")
    public ResponseEntity deleteCharacter(@RequestParam Long id) {
        return charactersService.deleteCharacter(id);
    }
}
