package com.meowmere.main.dto.character.preference;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class AllPreferencesDTO {
    @Getter
    @Setter
    private Long characterId;
    @Getter
    @Setter
    private String characterFullname;
    @Getter
    @Setter
    private List<HistoricPreferenceDTO> preferences;
    @Getter
    @Setter
    private List<HistoricPreferenceDTO> backwardPreferences;

}
