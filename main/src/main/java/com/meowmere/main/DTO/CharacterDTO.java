package com.meowmere.main;
import javax.persistence.*;

@Entity
@Table(name = "character")
public class CharacterDTO {
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

    protected CharacterDTO() {};

    public CharacterDTO(String charName, String charSurname,
                Long birthday, Long death,
                String story, String eyeColor1, String eyeColor2,
                String themeColor1, String themeColor2, String themeColor3){
        this.charName = charName;
        this.charSurname = charSurname;
        this.birthday = birthday;
        this.death = death;
        this.story = story;
        this.eyeColor1 = eyeColor1;
        this.eyeColor2 = eyeColor2;
        this.themeColor1 = themeColor1;
        this.themeColor2 = themeColor2;
        this.themeColor3 = themeColor3;
    };
};