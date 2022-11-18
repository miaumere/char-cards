package com.meowmere.main.dto.character.preference;

import lombok.Getter;
import lombok.Setter;

public class HistoricPreferenceDTO {
    @Getter
    @Setter
    private Long id;
    @Getter
    @Setter
    private String dateOfOrigin;
    @Getter
    @Setter
    private Integer range;

}
