package com.meowmere.main.dto.character.relation;

import java.util.List;

public class RelationForCharacter {
    private RelatedPersonData person;
    private List<RelationDTO> relations;


    public RelationForCharacter(RelatedPersonData person, List<RelationDTO> relations) {
        this.person = person;
        this.relations = relations;
    }

    public RelatedPersonData getPerson() {
        return person;
    }

    public void setPerson(RelatedPersonData person) {
        this.person = person;
    }

    public List<RelationDTO> getRelations() {
        return relations;
    }

    public void setRelations(List<RelationDTO> relations) {
        this.relations = relations;
    }
}


