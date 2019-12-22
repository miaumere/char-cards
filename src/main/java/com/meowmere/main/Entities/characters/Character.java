package com.meowmere.main.Entities.characters;

import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "character")
public class Character {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    public Long externalId;
    @Column
    @Length
    private String charName;
    @Column
    @Length
    private String charSurname;
    @Column
    private Long birthday;
    @Column
    private Long death;
    @Column
    private String deathReason;
    @Column
    private String occupation;
    @Column(length = 2000)
    private String story;

    @Column
    public Boolean archived = false;

    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Colors> colors;

    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Temperament> temperament;

    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Quote> quotes;

    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Measurements> measurements;

    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Story> stories;

    protected Character() {};

    public Character(@Length String charName,
                     @Length String charSurname,
                     Long birthday,
                     Long death,
                     String deathReason,
                     String occupation) {
        this.charName = charName;
        this.charSurname = charSurname;
        this.birthday = birthday;
        this.death = death;
        this.deathReason = deathReason;
        this.occupation = occupation;
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

    public String getStory() {
        return story;
    }

    public void setStory(String story) {
        this.story = story;
    }

    public Set<Colors> getColors() {return colors;}

    public void setColors(Set<Colors>  colors) {this.colors = colors; }

    public Set<Temperament> getTemperament() {return temperament; }

    public void setTemperament(Set<Temperament> temperament) {this.temperament = temperament; }

    public Set<Quote> getQuotes() {
        return quotes;
    }

    public void setQuotes(Set<Quote> quotes) {
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

    public Set<Story> getStories() {
        return stories;
    }

    public void setStories(Set<Story> stories) {
        this.stories = stories;
    }
};