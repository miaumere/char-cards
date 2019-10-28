package com.meowmere.main.Controllers;
import com.meowmere.main.DTO.CharacterDTO;
import com.meowmere.main.DTO.CharactersMenuDTO;
import com.meowmere.main.services.CharactersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class CharactersListController {

    @Autowired
    CharactersService charactersService;

    @GetMapping("/get-characters")
    public List<CharactersMenuDTO> CharListBean(){
        return charactersService.findCharList();
    }

    @GetMapping("/get-character/{characterId}")
    public CharacterDTO CharacterBean(@PathVariable Long characterId) {
        return charactersService.findByExternalId(characterId);
    }
//
//    @RequestMapping("/new-character")
//    public

}
