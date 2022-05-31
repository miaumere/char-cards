package com.meowmere.main.dto.character.tags;

public class AssignTagToCharacterRequest {
    private Integer tagId;
    private Long characterId;

    public AssignTagToCharacterRequest() {
    }

    public Integer getTagId() {
        return tagId;
    }

    public void setTagId(Integer tagId) {
        this.tagId = tagId;
    }

    public Long getCharacterId() {
        return characterId;
    }

    public void setCharacterId(Long characterId) {
        this.characterId = characterId;
    }
}
