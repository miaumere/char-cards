package com.meowmere.main.DTO.sideCharacters;

public class SideCharacterDetailsDTO {
    public Long externalId;
    public String sideCharacterName;
    public String sideCharacterSurname;
    public BookDTO book;
    public String sideCharacterDesc;

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

    public BookDTO getBook() {
        return book;
    }

    public void setBook(BookDTO book) {
        this.book = book;
    }
}
