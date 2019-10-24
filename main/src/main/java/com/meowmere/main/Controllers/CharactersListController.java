package com.meowmere.main.Controllers;

import com.meowmere.main.CharListBean;
import com.meowmere.main.CharacterBean;
import com.meowmere.main.Entities.Character;
import com.meowmere.main.services.CharactersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/xxx")
public class CharactersListController {

    @Autowired
    CharactersService charactersService;

    @RequestMapping("/get-characters")
    public Iterable<Character> CharListBean(@RequestParam(value="name", defaultValue="World") String name){
        return charactersService.findAll();
    }

    @RequestMapping("/get-character/{characterId}")
    public CharacterBean CharacterBean (@PathVariable Integer characterId) {
        CharacterBean character = new CharacterBean();
        character.setId(characterId);

        return character;
    }


}
