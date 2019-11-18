package com.meowmere.main.DTO.character;

public class CharacterDTO {
    public Long externalId;
    public String charName;
    public String charSurname;
    public Long birthday;
    public Long death;
    public String deathReason;
    public String occupation;
    public CharacterQuoteDTO quote;
    public String story;
    public CharacterColorDTO colors;
    public CharacterTemperamentDTO temperament;
    public CharacterMeasurementsDTO measurements;
    public String[] imagesList;

    public CharacterTemperamentDTO getTemperament() {
        return temperament;
    }

    public void setTemperament(CharacterTemperamentDTO temperament) {
        this.temperament = temperament;
    }

    public String[] getImagesList() {
        return imagesList;
    }

    public void setImagesList(String[] imagesList) {
        this.imagesList = imagesList;
    }

    public CharacterColorDTO getColors() {
        return colors;
    }

    public void setColors(CharacterColorDTO colors) {
        this.colors = colors;
    }

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

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getDeathReason() {
        return deathReason;
    }

    public void setDeathReason(String deathReason) {
        this.deathReason = deathReason;
    }

    public CharacterQuoteDTO getQuote() {
        return quote;
    }

    public void setQuote(CharacterQuoteDTO quote) {
        this.quote = quote;
    }

    public CharacterMeasurementsDTO getMeasurements() {
        return measurements;
    }

    public void setMeasurements(CharacterMeasurementsDTO measurements) {
        this.measurements = measurements;
    }
}
