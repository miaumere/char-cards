package com.meowmere.main.dto.character.relation;

import lombok.Getter;
import lombok.Setter;

public class CoordinatesRequest {
    @Getter
    @Setter
    private Long characterId;
    @Getter
    @Setter
    private Integer x;
    @Getter
    @Setter
    private Integer y;

}
