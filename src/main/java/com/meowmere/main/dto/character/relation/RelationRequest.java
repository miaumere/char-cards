package com.meowmere.main.dto.character.relation;

import com.meowmere.main.enums.RelationType;
import lombok.Getter;
import lombok.Setter;


public class RelationRequest {
    @Getter
    @Setter
    private Integer id;
    @Getter
    @Setter
    private Long sourceCharacterId;
    @Getter
    @Setter
    private Long targetCharacterId;
    @Getter
    @Setter
    private Long relationDateStart;
    @Getter
    @Setter
    private Long relationDateEnd;
    @Getter
    @Setter
    private RelationType type;
}
