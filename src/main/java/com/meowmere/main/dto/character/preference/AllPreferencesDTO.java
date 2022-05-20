package com.meowmere.main.dto.character.preference;

import java.util.List;

public class AllPreferencesDTO {
    private Long characterId;
    private String characterFullname;
    private List<HistoricPreferenceDTO> preferences;
    private List<HistoricPreferenceDTO> backwardPreferences;


    public Long getCharacterId() {
        return characterId;
    }

    public void setCharacterId(Long characterId) {
        this.characterId = characterId;
    }

    public String getCharacterFullname() {
        return characterFullname;
    }

    public void setCharacterFullname(String characterFullname) {
        this.characterFullname = characterFullname;
    }

    public List<HistoricPreferenceDTO> getPreferences() {
        return preferences;
    }

    public void setPreferences(List<HistoricPreferenceDTO> preferences) {
        this.preferences = preferences;
    }

    public List<HistoricPreferenceDTO> getBackwardPreferences() {
        return backwardPreferences;
    }

    public void setBackwardPreferences(List<HistoricPreferenceDTO> backwardPreferences) {
        this.backwardPreferences = backwardPreferences;
    }
}
