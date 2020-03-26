package com.meowmere.main.dto.sideCharacters;

public class RelationshipDTO {
    public Long id;
    public Long relativeId;
    public String relativeName;
    public String relativeSurname;
    public String relation;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRelativeId() {
        return relativeId;
    }

    public void setRelativeId(Long relativeId) {
        this.relativeId = relativeId;
    }

    public String getRelativeName() {
        return relativeName;
    }

    public void setRelativeName(String relativeName) {
        this.relativeName = relativeName;
    }

    public String getRelativeSurname() {
        return relativeSurname;
    }

    public void setRelativeSurname(String relativeSurname) {
        this.relativeSurname = relativeSurname;
    }

    public String getRelation() {
        return relation;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }
}
