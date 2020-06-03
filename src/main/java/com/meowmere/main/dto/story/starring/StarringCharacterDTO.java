package com.meowmere.main.dto.story.starring;

import com.meowmere.main.dto.character.character.CharactersMenuDTO;

public class StarringCharacterDTO {
    public Long id;
    public CharactersMenuDTO character;
    public String starringType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CharactersMenuDTO getCharacter() {
        return character;
    }

    public void setCharacter(CharactersMenuDTO character) {
        this.character = character;
    }

    public String getStarringType() {
        return starringType;
    }

    public void setStarringType(String starringType) {
        this.starringType = starringType;
    }
}
