package com.meowmere.main.requests.characters.stories;

public class StoryRequest {
    public Long titleId;
    public String story;

    public Long getTitleId() {
        return titleId;
    }

    public void setTitleId(Long titleId) {
        this.titleId = titleId;
    }

    public String getStory() {
        return story;
    }

    public void setStory(String story) {
        this.story = story;
    }
}
