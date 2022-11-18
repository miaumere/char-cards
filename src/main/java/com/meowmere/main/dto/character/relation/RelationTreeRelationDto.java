package com.meowmere.main.dto.character.relation;

import com.meowmere.main.enums.RelationType;
import lombok.Getter;
import lombok.Setter;

public class RelationTreeRelationDto {
    @Getter
    @Setter
    private Long source;
    @Getter
    @Setter
    private Long target;
    @Getter
    @Setter
    private RelationType type;
    @Getter
    @Setter
    private Long relationDateStart;
    @Getter
    @Setter
    private Long relationDateEnd;


}
