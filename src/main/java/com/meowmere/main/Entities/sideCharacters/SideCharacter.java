package com.meowmere.main.Entities.sideCharacters;
import javax.persistence.*;

@Entity
@Table(name = "side_character")
public class SideCharacter {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column
    private String sideCharacterName;

    @Column
    private String sideCharacterSurname;

    @Column
    private String sideCharacterDesc;

    @Column
    private String archived;

    protected SideCharacter() {};

    public Long getExternalId() {
        return id;
    }

    public void setExternalId(Long externalId) {
        this.id = externalId;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getArchived() {
        return archived;
    }

    public void setArchived(String archived) {
        this.archived = archived;
    }
}
