package com.meowmere.main.Requests.characters;

public class CreateStoryForCharRequest {
    public Long characterId;
    public StoryRequest[] stories;

    public Long getCharacterId() {
        return characterId;
    }

    public void setCharacterId(Long characterId) {
        this.characterId = characterId;
    }

    public StoryRequest[] getStories() {
        return stories;
    }

    public void setStories(StoryRequest[] stories) {
        this.stories = stories;
    }
}
