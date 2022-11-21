package com.meowmere.main.requests.characters.stories;

import lombok.Getter;
import lombok.Setter;

public class EditStarringCharacterRequest {
    @Getter
    @Setter
    private Long id;
    @Getter
    @Setter
    private Long characterId;
    @Getter
    @Setter
    private String starringType;
    @Getter
    @Setter
    private Long chapterId;

}
