package com.meowmere.main.dto.character.preference;

public class HistoricPreferenceDTO {
    private Long id;
    private String dateOfOrigin;
    private Integer range;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDateOfOrigin() {
        return dateOfOrigin;
    }

    public void setDateOfOrigin(String dateOfOrigin) {
        this.dateOfOrigin = dateOfOrigin;
    }

    public Integer getRange() {
        return range;
    }

    public void setRange(Integer range) {
        this.range = range;
    }
}
