package com.meowmere.main;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
public class CharactersListController {

    @RequestMapping("/get-characters")
    public CharList CharList(@RequestParam(value="name", defaultValue="World") String name){
        return new CharList(String.format(name));
    }

    @RequestMapping("/get-character/{characterId}")
    public Character Character(@PathVariable Integer characterId) {
        Character character = new Character();
        character.setId(characterId);

        return character;
    }


}
