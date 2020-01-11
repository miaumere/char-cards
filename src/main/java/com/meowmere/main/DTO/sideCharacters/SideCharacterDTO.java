package com.meowmere.main.DTO.sideCharacters;

import java.util.List;

public class SideCharacterDTO {
    public Long externalId;
    public String sideCharacterName;
    public String sideCharacterSurname;
    public String sideCharacterDesc;
    public List<BookDTO> books;
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

    public String getSideCharacterDesc() {
        return sideCharacterDesc;
    }

    public void setSideCharacterDesc(String sideCharacterDesc) {
        this.sideCharacterDesc = sideCharacterDesc;
    }

    public ProfilePicDTO getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(ProfilePicDTO profilePic) {
        this.profilePic = profilePic;
    }

    public List<BookDTO> getBooks() {
        return books;
    }

    public void setBooks(List<BookDTO> books) {
        this.books = books;
    }
}
