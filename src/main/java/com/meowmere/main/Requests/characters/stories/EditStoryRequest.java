package com.meowmere.main.Requests.characters.stories;

public class EditStoryRequest {
    public String story;
    public Long storyId;

    public String getStory() {
        return story;
    }

    public void setStory(String story) {
        this.story = story;
    }

    public Long getStoryId() {
        return storyId;
    }

    public void setStoryId(Long storyId) {
        this.storyId = storyId;
    }
}
