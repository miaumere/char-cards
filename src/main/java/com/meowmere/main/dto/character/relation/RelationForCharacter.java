package com.meowmere.main.dto.character.relation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
public class RelationForCharacter {
    @Getter
    @Setter
    private RelatedPersonData person;
    @Getter
    @Setter
    private List<RelationDTO> relations;


}


