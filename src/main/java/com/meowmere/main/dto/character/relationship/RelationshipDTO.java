package com.meowmere.main.dto.character.relationship;

public class RelationshipDTO {
    public RelatedCharacterDTO relatedCharacter;
    public String relationName;

    public RelatedCharacterDTO getRelatedCharacter() {
        return relatedCharacter;
    }

    public void setRelatedCharacter(RelatedCharacterDTO relatedCharacter) {
        this.relatedCharacter = relatedCharacter;
    }

    public String getRelationName() {
        return relationName;
    }

    public void setRelationName(String relationName) {
        this.relationName = relationName;
    }
}
