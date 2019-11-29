package com.meowmere.main.Requests.character;

public class ChangeCharacterStateRequest {
    public Long id;
    public Boolean archived;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getArchived() {
        return archived;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }
}
