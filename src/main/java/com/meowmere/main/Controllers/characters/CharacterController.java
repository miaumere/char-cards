package com.meowmere.main.Controllers.characters;

import com.meowmere.main.DTO.character.CharacterForListDTO;
import com.meowmere.main.DTO.character.CharactersMenuDTO;
import com.meowmere.main.DTO.character.TitleDTO;
import com.meowmere.main.Requests.characters.ChangeCharacterStateRequest;
import com.meowmere.main.Requests.characters.CreateStoryForCharRequest;
import com.meowmere.main.Services.characters.CharactersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api/characters/")
public class CharacterController {

    @Autowired
    CharactersService charactersService;

    @GetMapping("/get-characters")
    public List<CharactersMenuDTO> getCharactersList(){
        return charactersService.findCharList();
    }

    @GetMapping("/get-all-characters")
    public List<CharacterForListDTO> getEveryCharacter() { return charactersService.getEveryCharacter();}

    @GetMapping("/get-character/{characterId}")
    public ResponseEntity getCharacterById(@PathVariable Long characterId) throws IOException {
        return charactersService.findByExternalId(characterId);
    }

//    @PostMapping("/new-character")
//    public Character createCharacter(@RequestBody Character request) {
//        return charactersService.createCharacter(request);
//    }

    @PatchMapping("/change-state")
    public ResponseEntity changeStateOfCharacter(@RequestBody List<ChangeCharacterStateRequest> request){
        return charactersService.changeStatusForCharacters(request);
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

}
