package com.meowmere.main.Requests.sideCharacters;

public class EditSideCharRequest {
    public Long externalId;
    public String sideCharacterName;
    public String sideCharacterSurname;
    public String sideCharacterDesc;

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
}
