package com.meowmere.main.requests.characters.preference;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

public class PreferenceRequest {
    @Getter
    @Setter
    private Long characterId;
    @Getter
    @Setter
    private Long preferedCharacterId;
    @Getter
    @Setter
    private Integer range;
    @Getter
    @Setter
    private Date date;

}
