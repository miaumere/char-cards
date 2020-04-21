package com.meowmere.main.requests.characters.relationship;

public class EditRelationshipRequest {
    public Long characterId;
    public Long relatedCharacterId;
    public String reversedRelationType;
    public String relationType;

    public Long getCharacterId() {
        return characterId;
    }

    public void setCharacterId(Long characterId) {
        this.characterId = characterId;
    }

    public Long getRelatedCharacterId() {
        return relatedCharacterId;
    }

    public void setRelatedCharacterId(Long relatedCharacterId) {
        this.relatedCharacterId = relatedCharacterId;
    }

    public String getReversedRelationType() {
        return reversedRelationType;
    }

    public void setReversedRelationType(String reversedRelationType) {
        this.reversedRelationType = reversedRelationType;
    }

    public String getRelationType() {
        return relationType;
    }

    public void setRelationType(String relationType) {
        this.relationType = relationType;
    }

    public boolean validateValues() {
        if(this.characterId == null || this.relatedCharacterId == null) {
            return false;
        } else {
            return true;
        }

    }
}
