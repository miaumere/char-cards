package com.meowmere.main.DTO.character;

public class EveryCharacterMenuDTO {
    public Long id;
    public String charName;
    public String charSurname;
    public Boolean archived;
    public String profilePic;

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

    public Boolean getArchived() {
        return archived;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }
}
