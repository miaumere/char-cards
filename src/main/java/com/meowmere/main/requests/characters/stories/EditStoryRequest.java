package com.meowmere.main.requests.characters.stories;

public class EditStoryRequest {
    public String story;
    public String title;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
