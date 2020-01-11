package com.meowmere.main.DTO.character.character;

import com.meowmere.main.DTO.character.image.ProfilePicForMainDTO;

public class CharactersMenuDTO {
    public Long id;
    public String charName;
    public String charSurname;
    public ProfilePicForMainDTO profilePic;

    public ProfilePicForMainDTO getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(ProfilePicForMainDTO profilePic) {
        this.profilePic = profilePic;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCharName() {
        return charName;
    }

    public void setCharName(String charName) {
        this.charName = charName;
    }

    public String getCharSurname() {
        return charSurname;
    }

    public void setCharSurname(String charSurname) {
        this.charSurname = charSurname;
    }
}
