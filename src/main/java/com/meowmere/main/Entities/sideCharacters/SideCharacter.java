package com.meowmere.main.Entities.sideCharacters;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;

@Entity
@Table(name = "side_character")
public class SideCharacter {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    public Long externalId;

    @Column
    private String sideCharacterName;

    @Column
    private String sideCharacterSurname;

    @Column
    @Length(max = 2000)
    private String sideCharacterDesc;

    @Column
    public Boolean archived = false;

    protected SideCharacter(){}

    public SideCharacter(String sideCharacterName, String sideCharacterSurname, String sideCharacterDesc) {
        this.sideCharacterName = sideCharacterName;
        this.sideCharacterSurname = sideCharacterSurname;
        this.sideCharacterDesc = sideCharacterDesc;
    }

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

    public Boolean getArchived() {
        return archived;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }
}
