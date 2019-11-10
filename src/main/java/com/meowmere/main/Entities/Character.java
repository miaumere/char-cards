package com.meowmere.main.Entities;
import javax.persistence.*;

@Entity
@Table(name = "character")
public class Character {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long externalId;
    @Column
    private String charName;
    @Column
    private String charSurname;
    @Column
    private Long birthday;
    @Column
    private Long death;
    @Column
    private String deathReason;
    @Column
    private String occupation;
    @Column
    private String story;
    @Column
    private String eyeColor1;
    @Column
    private String eyeColor2;
    @Column
    private String themeColor1;
    @Column
    private String themeColor2;
    @Column
    private String themeColor3;

    protected Character() {};

    public Character(String charName, String charSurname,
                     Long birthday, Long death, String deathReason, String occupation,
                     String story, String eyeColor1, String eyeColor2,
                     String themeColor1, String themeColor2, String themeColor3){
        this.charName = charName;
        this.charSurname = charSurname;
        this.birthday = birthday;
        this.death = death;
        this.deathReason = deathReason;
        this.occupation = occupation;
        this.story = story;
        this.eyeColor1 = eyeColor1;
        this.eyeColor2 = eyeColor2;
        this.themeColor1 = themeColor1;
        this.themeColor2 = themeColor2;
        this.themeColor3 = themeColor3;
    };

    public Long getExternalId() {
        return externalId;
    }

    public void setExternalId(Long externalId) {
        this.externalId = externalId;
    }

    public String getCharName() {
        return charName;
    }

    public void setCharName(String charName) {
        this.charName = charName;
    }

    public String getCharSurname() {
        return charSurname;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public void setCharSurname(String charSurname) {
        this.charSurname = charSurname;
    }

    public Long getBirthday() {
        return birthday;
    }

    public String getDeathReason() {
        return deathReason;
    }

    public void setDeathReason(String deathReason) {
        this.deathReason = deathReason;
    }

    public void setBirthday(Long birthday) {
        this.birthday = birthday;
    }

    public Long getDeath() {
        return death;
    }

    public void setDeath(Long death) {
        this.death = death;
    }

    public String getStory() {
        return story;
    }

    public void setStory(String story) {
        this.story = story;
    }

    public String getEyeColor1() {
        return eyeColor1;
    }

    public void setEyeColor1(String eyeColor1) {
        this.eyeColor1 = eyeColor1;
    }

    public String getEyeColor2() {
        return eyeColor2;
    }

    public void setEyeColor2(String eyeColor2) {
        this.eyeColor2 = eyeColor2;
    }

    public String getThemeColor1() {
        return themeColor1;
    }

    public void setThemeColor1(String themeColor1) {
        this.themeColor1 = themeColor1;
    }

    public String getThemeColor2() {
        return themeColor2;
    }

    public void setThemeColor2(String themeColor2) {
        this.themeColor2 = themeColor2;
    }

    public String getThemeColor3() {
        return themeColor3;
    }

    public void setThemeColor3(String themeColor3) {
        this.themeColor3 = themeColor3;
    }
};