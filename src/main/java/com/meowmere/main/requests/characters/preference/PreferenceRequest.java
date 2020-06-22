package com.meowmere.main.requests.characters.preference;

import java.util.Date;

public class PreferenceRequest {
    private Long characterId;
    private Long preferedCharacterId;
    private Integer range;
    private Date date;

    public Long getCharacterId() {
        return characterId;
    }

    public void setCharacterId(Long characterId) {
        this.characterId = characterId;
    }

    public Long getPreferedCharacterId() {
        return preferedCharacterId;
    }

    public void setPreferedCharacterId(Long preferedCharacterId) {
        this.preferedCharacterId = preferedCharacterId;
    }

    public Integer getRange() {
        return range;
    }

    public void setRange(Integer range) {
        this.range = range;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
