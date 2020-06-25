package com.meowmere.main.dto.character.preference;

import java.util.List;

public class AllPreferencesDTO {
    private Long relCharacterId;
    private String relCharacterName;
    private String relCharacterSurname;
    private List<HistoricPreferenceDTO> preferences;

    public Long getRelCharacterId() {
        return relCharacterId;
    }

    public void setRelCharacterId(Long relCharacterId) {
        this.relCharacterId = relCharacterId;
    }

    public String getRelCharacterName() {
        return relCharacterName;
    }

    public void setRelCharacterName(String relCharacterName) {
        this.relCharacterName = relCharacterName;
    }

    public String getRelCharacterSurname() {
        return relCharacterSurname;
    }

    public void setRelCharacterSurname(String relCharacterSurname) {
        this.relCharacterSurname = relCharacterSurname;
    }

    public List<HistoricPreferenceDTO> getPreferences() {
        return preferences;
    }

    public void setPreferences(List<HistoricPreferenceDTO> preferences) {
        this.preferences = preferences;
    }
}
