package com.meowmere.main.dto.character.character;

import com.meowmere.main.dto.character.colors.CharacterColorDTO;
import com.meowmere.main.dto.character.image.ImageDTO;
import com.meowmere.main.dto.character.measurements.CharacterMeasurementsDTO;
import com.meowmere.main.dto.character.quote.CharacterQuoteDTO;
import com.meowmere.main.dto.character.relationship.RelationshipDTO;
import com.meowmere.main.dto.character.starring.BookForCharacter;
import com.meowmere.main.dto.character.story.CharacterStoryDTO;
import com.meowmere.main.dto.character.tags.TagDTO;
import com.meowmere.main.dto.character.temperament.CharacterTemperamentDTO;
import com.meowmere.main.dto.story.starring.BookWithStarringCharsDTO;

import java.util.ArrayList;
import java.util.List;

public class CharacterDTO {
    public Long externalId;
    public String charType;
    public Boolean archived;
    public String charName;
    public String charSurname;
    public String pseudonim;
    public String gender;
    public String nationality;
    public Long birthday;
    public Long death;
    public String deathReason;
    public String occupation;
    public CharacterQuoteDTO quote;
    public List<CharacterStoryDTO> story;
    public CharacterColorDTO colors;
    public CharacterTemperamentDTO temperament;
    public CharacterMeasurementsDTO measurements;
    public List<ImageDTO> imagesList;
    public List<BookForCharacter> starringIn;
    private String profilePic;
    private List<TagDTO> tags = new ArrayList<>();


    public String getCharType() {
        return charType;
    }

    public void setCharType(String charType) {
        this.charType = charType;
    }

    public CharacterTemperamentDTO getTemperament() {
        return temperament;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setTemperament(CharacterTemperamentDTO temperament) {
        this.temperament = temperament;
    }

    public List<ImageDTO> getImagesList() {
        return imagesList;
    }

    public void setImagesList(List<ImageDTO> imagesList) {
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

    public List<CharacterStoryDTO> getStory() {
        return story;
    }

    public void setStory(List<CharacterStoryDTO> story) {
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

    public String getPseudonim() {
        return pseudonim;
    }

    public void setPseudonim(String pseudonim) {
        this.pseudonim = pseudonim;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public List<BookForCharacter> getStarringIn() {
        return starringIn;
    }

    public void setStarringIn(List<BookForCharacter> starringIn) {
        this.starringIn = starringIn;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public Boolean getArchived() {
        return archived;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public List<TagDTO> getTags() {
        return tags;
    }

    public void setTags(List<TagDTO> tags) {
        this.tags = tags;
    }
}
