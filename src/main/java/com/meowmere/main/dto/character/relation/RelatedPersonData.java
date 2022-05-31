package com.meowmere.main.dto.character.relation;

public class RelatedPersonData {
    private Long id;
    private String fullName;
    private String imageMimeData;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getImageMimeData() {
        return imageMimeData;
    }

    public void setImageMimeData(String imageMimeData) {
        this.imageMimeData = imageMimeData;
    }
}
