package com.meowmere.main.dto.character.quote;

import lombok.Getter;
import lombok.Setter;

public class CharacterQuoteDTO {
    @Getter
    @Setter
    public Long id;
    @Getter
    @Setter
    public String quote;
    @Getter
    @Setter
    public String context;

}
