package com.meowmere.main.Entities.characters;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Entity
@Table(name="measurements")
public class Measurements {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    @Column
    private Integer babyHeight;
    @Column
    private Integer babyWeight;
    @Column
    private Integer childHeight;
    @Column
    private Integer childWeight;
    @Column
    private Integer teenHeight;
    @Column
    private Integer teenWeight;
    @Column
    private Integer adultHeight;
    @Column
    private Integer adultWeight;

    @ManyToOne(fetch =  FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_id")
    private Character character;

    protected  Measurements() {};

    public Measurements(Integer babyHeight,
                        Integer babyWeight,
                        Integer childHeight,
                        Integer childWeight,
                        Integer teenHeight,
                        Integer teenWeight,
                        Integer adultHeight,
                        Integer adultWeight,
                        Character character) {
        this.babyHeight = babyHeight;
        this.babyWeight = babyWeight;
        this.childHeight = childHeight;
        this.childWeight = childWeight;
        this.teenHeight = teenHeight;
        this.teenWeight = teenWeight;
        this.adultHeight = adultHeight;
        this.adultWeight = adultWeight;
        this.character = character;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBabyHeight() {
        return babyHeight;
    }

    public void setBabyHeight(Integer babyHeight) {
        this.babyHeight = babyHeight;
    }

    public Integer getBabyWeight() {
        return babyWeight;
    }

    public void setBabyWeight(Integer babyWeight) {
        this.babyWeight = babyWeight;
    }

    public Integer getChildHeight() {
        return childHeight;
    }

    public void setChildHeight(Integer childHeight) {
        this.childHeight = childHeight;
    }

    public Integer getChildWeight() {
        return childWeight;
    }

    public void setChildWeight(Integer childWeight) {
        this.childWeight = childWeight;
    }

    public Integer getTeenHeight() {
        return teenHeight;
    }

    public void setTeenHeight(Integer teenHeight) {
        this.teenHeight = teenHeight;
    }

    public Integer getTeenWeight() {
        return teenWeight;
    }

    public void setTeenWeight(Integer teenWeight) {
        this.teenWeight = teenWeight;
    }

    public Integer getAdultHeight() {
        return adultHeight;
    }

    public void setAdultHeight(Integer adultHeight) {
        this.adultHeight = adultHeight;
    }

    public Integer getAdultWeight() {
        return adultWeight;
    }

    public void setAdultWeight(Integer adultWeight) {
        this.adultWeight = adultWeight;
    }

    public Character getCharacter() {
        return character;
    }

    public void setCharacter(Character character) {
        this.character = character;
    }
}
