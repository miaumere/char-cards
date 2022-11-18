package com.meowmere.main.dto.character.tags;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
public class AssignTagToCharacterRequest {
    @Getter
    @Setter
    private Integer tagId;
    @Getter
    @Setter
    private Long characterId;


}
