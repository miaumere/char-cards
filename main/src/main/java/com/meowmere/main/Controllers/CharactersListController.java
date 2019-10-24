package com.meowmere.main.Controllers;

import com.meowmere.main.CharListBean;
import com.meowmere.main.CharacterBean;
import com.meowmere.main.DTO.CharacterDTO;
import com.meowmere.main.Entities.Character;
import com.meowmere.main.services.CharactersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class CharactersListController {

    @Autowired
    CharactersService charactersService;

    @RequestMapping("/get-characters")
    public CharacterDTO CharListBean(@RequestParam(value="name", defaultValue="World") String name){
        return charactersService.findAll();
    }

    @RequestMapping("/get-character/{characterId}")
    public CharacterDTO CharacterBean(@PathVariable Long characterId) {

        return charactersService.findByExternalId(characterId);
    }


}
