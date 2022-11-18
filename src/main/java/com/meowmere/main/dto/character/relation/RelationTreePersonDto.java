package com.meowmere.main.dto.character.relation;

import lombok.Getter;
import lombok.Setter;

public class RelationTreePersonDto {
    @Getter
    @Setter
    private Long id;
    @Getter
    @Setter
    private String fullName;
    @Getter
    @Setter
    private String imageMimeData;
    @Getter
    @Setter
    private CoordinatesDTO coordinates;

}

