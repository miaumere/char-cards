package com.meowmere.main.Entities.characters;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;

@Entity
@Table(name = "colors")
public class Colors {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column
    @Length(min = 3, max = 7)
    private String eyeColor1;

    @Column
    @Length(min = 3, max = 7)
    private String eyeColor2;

    @Column
    @Length(min = 3, max = 7)
    private String themeColor1;

    @Column
    @Length(min = 3, max = 7)
    private String themeColor2;

    @Column
    @Length(min = 3, max = 7)
    private String themeColor3;

    @Column
    @Length(min = 3, max = 7)
    private String hairColor;

    @Column
    @Length(min = 3, max = 7)
    private String skinColor;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_id", unique = true)
    private Character character;

    protected Colors() {};

    public Colors(String eyeColor1,
                  String eyeColor2,
                  String themeColor1,
                  String themeColor2,
                  String themeColor3,
                  String hairColor,
                  String skinColor,
                  Character character) {
        this.eyeColor1 = eyeColor1;
        this.eyeColor2 = eyeColor2;
        this.themeColor1 = themeColor1;
        this.themeColor2 = themeColor2;
        this.themeColor3 = themeColor3;
        this.hairColor = hairColor;
        this.skinColor = skinColor;
        this.character = character;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
    public String getHairColor() {
        return hairColor;
    }

    public void setHairColor(String hairColor) {
        this.hairColor = hairColor;
    }

    public String getSkinColor() {
        return skinColor;
    }

    public void setSkinColor(String skinColor) {
        this.skinColor = skinColor;
    }
    public Character getCharacter() {
        return character;
    }

    public void setCharacter(Character character) {
        this.character = character;
    }
}
