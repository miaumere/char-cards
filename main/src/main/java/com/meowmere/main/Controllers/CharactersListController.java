package com.meowmere.main.Controllers;
import com.meowmere.main.DTO.CharacterDTO;
import com.meowmere.main.DTO.CharactersMenuDTO;
import com.meowmere.main.Entities.Character;
import com.meowmere.main.services.CharactersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api/characters-list/")
public class CharactersListController {

    @Autowired
    CharactersService charactersService;

    @GetMapping("/get-characters")
    public List<CharactersMenuDTO> getCharactersList(){
        return charactersService.findCharList();
    }

    @GetMapping("/get-character/{characterId}")
    public CharacterDTO getCharacterById(@PathVariable Long characterId) throws IOException {
        return charactersService.findByExternalId(characterId);
    }

    @PostMapping("/new-character")
    public Character createCharacter(@RequestBody Character request) {
        return charactersService.createCharacter(request);
    }

}
