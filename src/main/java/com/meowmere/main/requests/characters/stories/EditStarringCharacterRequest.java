package com.meowmere.main.requests.characters.stories;

public class EditStarringCharacterRequest {
    public Long id;
    public Long characterId;
    public String starringType;
    public Long chapterId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCharacterId() {
        return characterId;
    }

    public void setCharacterId(Long characterId) {
        this.characterId = characterId;
    }

    public String getStarringType() {
        return starringType;
    }

    public void setStarringType(String starringType) {
        this.starringType = starringType;
    }

    public Long getChapterId() {
        return chapterId;
    }

    public void setChapterId(Long chapterId) {
        this.chapterId = chapterId;
    }
}
