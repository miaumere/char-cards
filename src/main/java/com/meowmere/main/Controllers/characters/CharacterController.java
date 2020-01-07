package com.meowmere.main.Controllers.characters;

import com.meowmere.main.DTO.character.character.CharactersMenuDTO;
import com.meowmere.main.DTO.character.character.EveryCharacterMenuDTO;
import com.meowmere.main.DTO.character.titles.TitleDTO;
import com.meowmere.main.Requests.characters.character.ChangeCharacterStateRequest;
import com.meowmere.main.Requests.characters.character.EditCharacterRequest;
import com.meowmere.main.Requests.characters.quotes.EditQuoteRequest;
import com.meowmere.main.Requests.characters.quotes.NewQuoteForCharacterRequest;
import com.meowmere.main.Requests.characters.stories.CreateStoryForCharRequest;
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

    @PatchMapping("/edit-quote")
    public ResponseEntity editQuote(@RequestBody EditQuoteRequest editQuoteRequest) {
        return charactersService.editQuote(editQuoteRequest);
    }

    @GetMapping("/get-titles")
    public ResponseEntity getStoryTitles(){
        List<TitleDTO> result = charactersService.getTitles();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/new-stories")
    public ResponseEntity createStoryForCharacter(@RequestBody CreateStoryForCharRequest createStoryForCharRequest){
        return charactersService.createStoryForCharacter(createStoryForCharRequest);
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
