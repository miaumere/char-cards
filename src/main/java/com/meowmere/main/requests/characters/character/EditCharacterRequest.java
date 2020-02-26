package com.meowmere.main.requests.characters.character;

import com.meowmere.main.dto.character.colors.CharacterColorDTO;
import com.meowmere.main.dto.character.measurements.CharacterMeasurementsDTO;
import com.meowmere.main.dto.character.temperament.CharacterTemperamentDTO;

public class EditCharacterRequest {
    public Long externalId;
    public String charName;
    public String charSurname;
    public Long birthday;
    public String occupation;
    public Long death;
    public String deathReason;
    public CharacterTemperamentDTO temperament;
    public CharacterColorDTO colors;
    public CharacterMeasurementsDTO measurements;

    public Long getExternalId() {
        return externalId;
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

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
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

    public CharacterTemperamentDTO getTemperament() {
        return temperament;
    }

    public void setTemperament(CharacterTemperamentDTO temperament) {
        this.temperament = temperament;
    }

    public CharacterColorDTO getColors() {
        return colors;
    }

    public void setColors(CharacterColorDTO colors) {
        this.colors = colors;
    }

    public CharacterMeasurementsDTO getMeasurements() {
        return measurements;
    }

    public void setMeasurements(CharacterMeasurementsDTO measurements) {
        this.measurements = measurements;
    }
}
