package com.meowmere.main.dto.character.relation;
import java.util.List;

public class RelationRequest {
    private Long personId;
    private List<RelationDTO> relations;

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public List<RelationDTO> getRelations() {
        return relations;
    }

    public void setRelations(List<RelationDTO> relations) {
        this.relations = relations;
    }

}
