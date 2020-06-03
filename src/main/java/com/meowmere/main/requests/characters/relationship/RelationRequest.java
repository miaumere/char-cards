package com.meowmere.main.requests.characters.relationship;

import com.meowmere.main.enums.RelationshipType;

public class RelationRequest {
    public Long charId;
    public Long relCharId;
    public RelationshipType relation;
    public RelationshipType reverseRelation;

    public Long getCharId() {
        return charId;
    }

    public void setCharId(Long charId) {
        this.charId = charId;
    }

    public Long getRelCharId() {
        return relCharId;
    }

    public void setRelCharId(Long relCharId) {
        this.relCharId = relCharId;
    }

    public RelationshipType getRelation() {
        return relation;
    }

    public void setRelation(RelationshipType relation) {
        this.relation = relation;
    }

    public RelationshipType getReverseRelation() {
        return reverseRelation;
    }

    public void setReverseRelation(RelationshipType reverseRelation) {
        this.reverseRelation = reverseRelation;
    }
}
