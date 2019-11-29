package com.meowmere.main.Requests.sideCharacters;

public class SideCharacterChangeRequest {
    public Long externalId;
    public Boolean archived;

    public Long getExternalId() {
        return externalId;
    }

    public void setExternalId(Long externalId) {
        this.externalId = externalId;
    }

    public Boolean getArchived() {
        return archived;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }
}
