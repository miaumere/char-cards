package com.meowmere.main.requests.sideCharacters;

public class NewRelationForSideCharRequest {
    public Long sideCharacterId;
    public Long relatedCharacterId;
    public String relationName;

    public Long getSideCharacterId() {
        return sideCharacterId;
    }

    public void setSideCharacterId(Long sideCharacterId) {
        this.sideCharacterId = sideCharacterId;
    }

    public Long getRelatedCharacterId() {
        return relatedCharacterId;
    }

    public void setRelatedCharacterId(Long relatedCharacterId) {
        this.relatedCharacterId = relatedCharacterId;
    }

    public String getRelationName() {
        return relationName;
    }

    public void setRelationName(String relationName) {
        this.relationName = relationName;
    }
}
