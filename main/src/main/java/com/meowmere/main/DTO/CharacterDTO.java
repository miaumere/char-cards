package com.meowmere.main.DTO;

public class CharacterDTO {
    public Long externalId;
    public String charName;
    public String charSurname;
    public Long birthday;
    public Long death;
    public String story;
    public String eyeColor1;

    public String getCharSurname() {
        return charSurname;
    }

    public void setCharSurname(String charSurname) {
        this.charSurname = charSurname;
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

    public String eyeColor2;
    public String themeColor1;
    public String themeColor2;
    public String themeColor3;

    public String getCharName() {
        return charName;
    }

    public void setCharName(String charName) {
        this.charName = charName;
    }

    public Long getBirthday() {
        return birthday;
    }

    public void setBirthday(Long birthday) {
        this.birthday = birthday;
    }

    public Long getExternalId() {
        return externalId;
    }
    public void setExternalId(Long externalId) {
        this.externalId = externalId;
    }
}
