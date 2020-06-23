package com.meowmere.main.dto.character.preference;

import com.meowmere.main.dto.character.image.ImageDTO;

public class PreferenceDTO {
    private Long relCharId;
    private String relCharName;
    private String relCharSurname;
    private ImageDTO relCharAvatar;
    private Integer range;

    public Long getRelCharId() {
        return relCharId;
    }

    public void setRelCharId(Long relCharId) {
        this.relCharId = relCharId;
    }

    public String getRelCharName() {
        return relCharName;
    }

    public void setRelCharName(String relCharName) {
        this.relCharName = relCharName;
    }

    public String getRelCharSurname() {
        return relCharSurname;
    }

    public void setRelCharSurname(String relCharSurname) {
        this.relCharSurname = relCharSurname;
    }

    public ImageDTO getRelCharAvatar() {
        return relCharAvatar;
    }

    public void setRelCharAvatar(ImageDTO relCharAvatar) {
        this.relCharAvatar = relCharAvatar;
    }

    public Integer getRange() {
        return range;
    }

    public void setRange(Integer range) {
        this.range = range;
    }
}
