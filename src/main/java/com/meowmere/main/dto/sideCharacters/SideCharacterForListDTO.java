package com.meowmere.main.dto.sideCharacters;

public class SideCharacterForListDTO {
    public Long externalId;
    public String sideCharacterName;
    public String sideCharacterSurname;
    public Boolean archived;
    public ProfilePicDTO profilePic;

    public Long getExternalId() {
        return externalId;
    }

    public void setExternalId(Long externalId) {
        this.externalId = externalId;
    }

    public String getSideCharacterName() {
        return sideCharacterName;
    }

    public void setSideCharacterName(String sideCharacterName) {
        this.sideCharacterName = sideCharacterName;
    }

    public String getSideCharacterSurname() {
        return sideCharacterSurname;
    }

    public void setSideCharacterSurname(String sideCharacterSurname) {
        this.sideCharacterSurname = sideCharacterSurname;
    }

    public Boolean getArchived() {
        return archived;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public ProfilePicDTO getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(ProfilePicDTO profilePic) {
        this.profilePic = profilePic;
    }
}