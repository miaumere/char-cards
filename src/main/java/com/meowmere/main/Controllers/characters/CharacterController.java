package com.meowmere.main.Controllers.characters;

import com.meowmere.main.DTO.character.character.CharactersMenuDTO;
import com.meowmere.main.DTO.character.character.EveryCharacterMenuDTO;
import com.meowmere.main.DTO.character.titles.TitleDTO;
import com.meowmere.main.Requests.characters.character.ChangeCharacterStateRequest;
import com.meowmere.main.Requests.characters.character.EditCharacterRequest;
import com.meowmere.main.Requests.characters.quotes.EditQuoteRequest;
import com.meowmere.main.Requests.characters.quotes.NewQuoteForCharacterRequest;
import com.meowmere.main.Requests.characters.stories.CreateStoryForCharRequest;
import com.meowmere.main.Requests.characters.titles.EditTitleRequest;
import com.meowmere.main.Requests.characters.titles.NewTitleRequest;
import com.meowmere.main.Services.characters.CharactersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public List<CharactersMenuDTO> getCharactersList(){ return charactersService.findCharList(); }

    @GetMapping("/get-all-characters")
    public List<EveryCharacterMenuDTO> getEveryCharacter() { return charactersService.getEveryCharacter();}

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

    @PostMapping("/new-character")
    public ResponseEntity createCharacter(MultipartHttpServletRequest multipartHttpServletRequest) {
        return charactersService.createCharacter(multipartHttpServletRequest);
    }

    @PostMapping("/new-quote")
    public ResponseEntity createQuoteForCharacter(@RequestBody NewQuoteForCharacterRequest newQuoteForCharacterRequest) {
        return charactersService.createQuoteForCharacter(newQuoteForCharacterRequest);
    }

    @PutMapping("/edit-character")
    public ResponseEntity editCharacter(@RequestBody  EditCharacterRequest request) {
        return charactersService.editCharacter(request);
    }

    @PatchMapping("/change-state")
    public ResponseEntity changeStateOfCharacter(@RequestBody ChangeCharacterStateRequest request){
        return charactersService.changeStatusForCharacter(request);
    }

    @GetMapping("/get-titles")
    public ResponseEntity getStoryTitles(){
        List<TitleDTO> result = charactersService.getTitles();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/get-stories")
    public ResponseEntity getStoriesForChar(@RequestParam Long id) {
        return this.charactersService.getStoriesForCharacter(id);
    }

    @PostMapping("/new-stories")
    public ResponseEntity createStoryForCharacter(@RequestBody CreateStoryForCharRequest createStoryForCharRequest){
        return charactersService.createStoryForCharacter(createStoryForCharRequest);
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
}
