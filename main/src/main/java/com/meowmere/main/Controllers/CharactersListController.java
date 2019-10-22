package com.meowmere.main;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
public class CharactersListController {

    @RequestMapping("/get-characters")
    public CharListBean CharListBean(@RequestParam(value="name", defaultValue="World") String name){
        return new CharListBean(String.format(name));
    }

    @RequestMapping("/get-character/{characterId}")
    public CharacterBean CharacterBean (@PathVariable Integer characterId) {
        CharacterBean character = new CharacterBean();
        character.setId(characterId);

        return character;
    }


}
