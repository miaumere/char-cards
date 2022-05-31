package com.meowmere.main.dto.character.preference;

import com.meowmere.main.dto.character.image.ImageDTO;

public class PreferenceDTO {
    private Long id;
    private String fullname;
    private String profilePic;
    private Integer range;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public Integer getRange() {
        return range;
    }

    public void setRange(Integer range) {
        this.range = range;
    }
}
