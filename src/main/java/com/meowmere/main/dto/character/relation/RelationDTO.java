package com.meowmere.main.dto.character.relation;

import com.meowmere.main.enums.RelationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
public class RelationDTO {
    @Getter
    @Setter
    private Integer id;
    @Getter
    @Setter
    private RelationType type;
    @Getter
    @Setter
    private Boolean arrowFromSource;
    @Getter
    @Setter
    private Long relationDateStart;
    @Getter
    @Setter
    private Long relationDateEnd;


}
