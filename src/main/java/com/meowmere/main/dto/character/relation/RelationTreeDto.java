package com.meowmere.main.dto.character.relation;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class RelationTreeDto {
    @Getter
    @Setter
    private HashSet<RelationTreePersonDto> persons = new HashSet<>();
    @Getter
    @Setter
    private HashSet<RelationTreeRelationDto> relations = new HashSet<>();

}
