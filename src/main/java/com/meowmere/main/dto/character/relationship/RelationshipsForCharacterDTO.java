package com.meowmere.main.dto.character.relationship;

public class RelationshipsForCharacterDTO {
    public RelationshipDTO relationship;
    public String reverseRelationshipType;

    public RelationshipDTO getRelationship() {
        return relationship;
    }

    public void setRelationship(RelationshipDTO relationship) {
        this.relationship = relationship;
    }


    public String getReverseRelationshipType() {
        return reverseRelationshipType;
    }

    public void setReverseRelationshipType(String reverseRelationshipType) {
        this.reverseRelationshipType = reverseRelationshipType;
    }
}
