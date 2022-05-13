package com.meowmere.main.dto.character.relation;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class RelationTreeDto {
    private HashSet<RelationTreePersonDto> persons = new HashSet<>();
    private HashSet<RelationTreeRelationDto> relations = new HashSet<>();

    public HashSet<RelationTreePersonDto> getPersons() {
        return persons;
    }

    public void setPersons(HashSet<RelationTreePersonDto> persons) {
        this.persons = persons;
    }

    public HashSet<RelationTreeRelationDto> getRelations() {
        return relations;
    }

    public void setRelations(HashSet<RelationTreeRelationDto> relations) {
        this.relations = relations;
    }
}
