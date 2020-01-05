package com.meowmere.main.DTO.character.character;

import com.meowmere.main.DTO.character.measurements.CharacterMeasurementsDTO;
import com.meowmere.main.DTO.character.temperament.CharacterTemperamentDTO;
import com.meowmere.main.DTO.character.colors.CharacterColorDTO;

public class CharacterDetailsDTO {
    public Long externalId;
    public String charName;
    public String charSurname;
    public Long birthday;
    public Long death;
    public String deathReason;
    public String occupation;
    public CharacterColorDTO colors;
    public CharacterTemperamentDTO temperament;
    public CharacterMeasurementsDTO measurements;

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

    public void setCharSurname(String charSurname) {
        this.charSurname = charSurname;
    }

    public Long getBirthday() {
        return birthday;
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

    public String getDeathReason() {
        return deathReason;
    }

    public void setDeathReason(String deathReason) {
        this.deathReason = deathReason;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public CharacterColorDTO getColors() {
        return colors;
    }

    public void setColors(CharacterColorDTO colors) {
        this.colors = colors;
    }

    public CharacterTemperamentDTO getTemperament() {
        return temperament;
    }

    public void setTemperament(CharacterTemperamentDTO temperament) {
        this.temperament = temperament;
    }

    public CharacterMeasurementsDTO getMeasurements() {
        return measurements;
    }

    public void setMeasurements(CharacterMeasurementsDTO measurements) {
        this.measurements = measurements;
    }
}
