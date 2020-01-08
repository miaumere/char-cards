package com.meowmere.main.DTO.character.story;

import com.meowmere.main.DTO.character.titles.TitleDTO;

public class StoryForListDTO {
    public Long id;
    public TitleDTO title;
    public String story;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TitleDTO getTitle() {
        return title;
    }

    public void setTitle(TitleDTO title) {
        this.title = title;
    }

    public String getStory() {
        return story;
    }

    public void setStory(String story) {
        this.story = story;
    }
}
