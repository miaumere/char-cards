package com.meowmere.main.requests.sideCharacters;

import java.util.List;

public class EditSideCharRequest {
    public Long externalId;
    public String sideCharacterName;
    public String sideCharacterSurname;
    public String sideCharacterDesc;
    public List<Long> booksIds;

    public Long getExternalId() {
        return externalId;
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

    public List<Long> getBooksIds() {
        return booksIds;
    }

    public void setBooksIds(List<Long> booksIds) {
        this.booksIds = booksIds;
    }
}
