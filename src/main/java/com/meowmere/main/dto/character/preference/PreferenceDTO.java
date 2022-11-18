package com.meowmere.main.dto.character.preference;

import com.meowmere.main.dto.character.image.ImageDTO;
import lombok.Getter;
import lombok.Setter;

public class PreferenceDTO {
    @Getter
    @Setter
    private Long id;
    @Getter
    @Setter
    private String fullname;
    @Getter
    @Setter
    private String profilePic;
    @Getter
    @Setter
    private Integer range;

}
