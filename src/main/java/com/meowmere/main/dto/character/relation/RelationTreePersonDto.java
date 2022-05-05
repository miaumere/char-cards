package com.meowmere.main.dto.character.relation;

public class RelationTreePersonDto {
    private Integer id;
    private String fullName;
    private String imageMimeData;
    private Coordinates coordinates;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public Coordinates getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(Coordinates coordinates) {
        this.coordinates = coordinates;
    }
}

