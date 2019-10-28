package com.meowmere.main.Entities;
import javax.persistence.*;

@Entity
@Table(name = "side_character")
public class SideCharacter {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long externalId;

    @Column
    private String sideCharacterName;

    @Column
    private String sideCharacterSurname;

    @Column
    private String sideCharacterDesc;

    @Column
    private String sideCharacterColor1;

    @Column
    private String sideCharacterColor2;

    @Column
    private String sideCharacterColor3;

    protected SideCharacter() {};

    public SideCharacter(
            String sideCharacterName,
            String sideCharacterSurname,
            String sideCharacterDesc,
            String sideCharacterColor1,
            String sideCharacterColor2,
            String sideCharacterColor3
            ) {
        this.sideCharacterName = sideCharacterName;
        this.sideCharacterSurname = sideCharacterSurname;
        this.sideCharacterDesc = sideCharacterDesc;
        this.sideCharacterColor1 = sideCharacterColor1;
        this.sideCharacterColor2 = sideCharacterColor2;
        this.sideCharacterColor3 = sideCharacterColor3;
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

    public String getSideCharacterColor1() {
        return sideCharacterColor1;
    }

    public void setSideCharacterColor1(String sideCharacterColor1) {
        this.sideCharacterColor1 = sideCharacterColor1;
    }

    public String getSideCharacterColor2() {
        return sideCharacterColor2;
    }

    public void setSideCharacterColor2(String sideCharacterColor2) {
        this.sideCharacterColor2 = sideCharacterColor2;
    }

    public String getSideCharacterColor3() {
        return sideCharacterColor3;
    }

    public void setSideCharacterColor3(String sideCharacterColor3) {
        this.sideCharacterColor3 = sideCharacterColor3;
    }
}
