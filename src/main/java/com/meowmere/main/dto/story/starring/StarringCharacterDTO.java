package com.meowmere.main.dto.story.starring;

import com.meowmere.main.dto.character.character.CharactersMenuDTO;
import lombok.Getter;
import lombok.Setter;

public class StarringCharacterDTO {
    @Getter
    @Setter
    public Long id;
    @Getter
    @Setter
    public CharactersMenuDTO character;
    @Getter
    @Setter
    public String starringType;

}
