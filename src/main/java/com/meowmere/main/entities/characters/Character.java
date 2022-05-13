package com.meowmere.main.entities.characters;

import com.meowmere.main.entities.story.StarringCharacters;
import com.meowmere.main.enums.CharType;
import com.meowmere.main.enums.Gender;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "character")
public class Character {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    public Long externalId;
    @Column
    private String charName;
    @Column
    private String charSurname;
    @Column
    private String pseudonim;
    @Column
    private Long birthday;
    @Column
    private Long death;
    @Column
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @Column
    private String deathReason;
    @Column
    private String occupation;
    @Column
    public Boolean archived = false;
    @Column
    public String nationality;

    @Column(name = "character_type")
    @Enumerated(EnumType.STRING)
    public CharType charType;

    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private Set<Colors> colors;

    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private Set<Temperament> temperament;

    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private List<Quote> quotes;

    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private Set<Measurements> measurements;

    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private Set<CharacterStory> characterStory;

    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private Set<Image> profilePics;

    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private Set<StarringCharacters> existingCharacters;

    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private List<Relationship> relationships;

    @OneToMany(mappedBy = "relatedCharacter", cascade = CascadeType.ALL)
    private List<Relationship> relatedTo;

    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private List<Preference> preferences;

    @OneToMany(mappedBy = "preferedCharacter", cascade = CascadeType.ALL)
    private List<Preference> preferedBy;

    @OneToMany(mappedBy = "relatedCharacter", cascade = CascadeType.ALL)
    private List<Relation> relatedCharacter;

    @OneToMany(mappedBy = "sourceCharacter", cascade = CascadeType.ALL)
    private List<RelationCoordinates> coordinatesForSource;

    @OneToMany(mappedBy = "targetCharacter", cascade = CascadeType.ALL)
    private List<RelationCoordinates> coordinatesForTarget;

    public Character() {};

    public CharType getCharType() {
        return charType;
    }

    public void setCharType(CharType charType) {
        this.charType = charType;
    }

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

    public Set<Colors> getColors() {return colors;}

    public void setColors(Set<Colors>  colors) {this.colors = colors; }

    public Set<Temperament> getTemperament() {return temperament; }

    public void setTemperament(Set<Temperament> temperament) {this.temperament = temperament; }

    public List<Quote> getQuotes() {
        return quotes;
    }

    public void setQuotes(List<Quote> quotes) {
        this.quotes = quotes;
    }

    public Set<Measurements> getMeasurements() {
        return measurements;
    }

    public void setMeasurements(Set<Measurements> measurements) {
        this.measurements = measurements;
    }

    public Boolean getArchived() {
        return archived;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public Set<Image> getProfilePics() {
        return profilePics;
    }

    public void setProfilePics(Set<Image> profilePics) {
        this.profilePics = profilePics;
    }

    public List<Relationship> getRelationships() {
        return relationships;
    }

    public void setRelationships(List<Relationship> relationships) {
        this.relationships = relationships;
    }

    public List<Relationship> getRelatedTo() {
        return relatedTo;
    }

    public void setRelatedTo(List<Relationship> relatedTo) {
        this.relatedTo = relatedTo;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Set<CharacterStory> getStory() {
        return characterStory;
    }

    public void setStory(Set<CharacterStory> story) {
        this.characterStory = story;
    }

    public String getPseudonim() {
        return pseudonim;
    }

    public void setPseudonim(String pseudonim) {
        this.pseudonim = pseudonim;
    }

    public Set<CharacterStory> getCharacterStory() {
        return characterStory;
    }

    public void setCharacterStory(Set<CharacterStory> characterStory) {
        this.characterStory = characterStory;
    }

    public Set<StarringCharacters> getExistingCharacters() {
        return existingCharacters;
    }

    public void setExistingCharacters(Set<StarringCharacters> existingCharacters) {
        this.existingCharacters = existingCharacters;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public List<Preference> getPreferences() {
        return preferences;
    }

    public void setPreferences(List<Preference> preferences) {
        this.preferences = preferences;
    }

    public List<Preference> getPreferedBy() {
        return preferedBy;
    }

    public void setPreferedBy(List<Preference> preferedBy) {
        this.preferedBy = preferedBy;
    }

    public List<Relation> getRelatedCharacter() {
        return relatedCharacter;
    }

    public void setRelatedCharacter(List<Relation> relatedCharacter) {
        this.relatedCharacter = relatedCharacter;
    }

    public List<RelationCoordinates> getCoordinatesForSource() {
        return coordinatesForSource;
    }

    public void setCoordinatesForSource(List<RelationCoordinates> coordinatesForSource) {
        this.coordinatesForSource = coordinatesForSource;
    }

    public List<RelationCoordinates> getCoordinatesForTarget() {
        return coordinatesForTarget;
    }

    public void setCoordinatesForTarget(List<RelationCoordinates> coordinatesForTarget) {
        this.coordinatesForTarget = coordinatesForTarget;
    }
};