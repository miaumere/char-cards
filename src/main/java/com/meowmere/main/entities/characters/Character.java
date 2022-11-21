package com.meowmere.main.entities.characters;

import com.meowmere.main.entities.story.StarringCharacters;
import com.meowmere.main.enums.CharType;
import com.meowmere.main.enums.Gender;
import com.meowmere.main.requests.characters.character.EditCharacterRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@Entity
@Table(name = "character")
public class Character {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long externalId;
    @Getter
    @Setter
    @Column
    private String charName;
    @Getter
    @Setter
    @Column
    private String charSurname;
    @Getter
    @Setter
    @Column
    private String pseudonim;
    @Getter
    @Setter
    @Column
    private Long birthday;
    @Getter
    @Setter
    @Column
    private Long death;
    @Getter
    @Setter
    @Column
    @Enumerated(EnumType.STRING)
    private Gender gender = Gender.UNKNOWNGENDER;
    @Getter
    @Setter
    @Column
    private String deathReason;
    @Getter
    @Setter
    @Column
    private String occupation;
    @Getter
    @Setter
    @Column
    private Boolean archived = false;
    @Getter
    @Setter
    @Column
    private String nationality;

    @Getter
    @Setter
    @Column
    private String mbtiPersonality;

    @Getter
    @Setter
    @Column
    private String favouriteFood;

    @Getter
    @Setter
    @Column
    private String leastFavouriteFood;

    @Getter
    @Setter
    @Column
    private String hobby;
    

    @Getter
    @Setter
    @Column(name = "character_type")
    @Enumerated(EnumType.STRING)
    private CharType charType = CharType.BACKGROUND;

    //#region related entities
    @Getter
    @Setter
    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private Set<Colors> colors;
    @Getter
    @Setter
    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private Set<Temperament> temperament;
    @Getter
    @Setter
    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private List<Quote> quotes;
    @Getter
    @Setter
    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private Set<Measurements> measurements;
    @Getter
    @Setter
    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private Set<CharacterStory> characterStory;
    @Getter
    @Setter
    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private Set<Image> profilePics;
    @Getter
    @Setter
    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private Set<StarringCharacters> existingCharacters;
    @Getter
    @Setter
    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private List<Preference> preferences;
    @Getter
    @Setter
    @OneToMany(mappedBy = "preferedCharacter", cascade = CascadeType.ALL)
    private List<Preference> preferedBy;
    @Getter
    @Setter
    @OneToMany(mappedBy = "relatedCharacter", cascade = CascadeType.ALL)
    private List<Relation> relatedCharacter;
    @Getter
    @Setter
    @OneToMany(mappedBy = "sourceCharacter", cascade = CascadeType.ALL)
    private List<RelationCoordinates> coordinatesForSource;
    @Getter
    @Setter
    @OneToMany(mappedBy = "targetCharacter", cascade = CascadeType.ALL)
    private List<RelationCoordinates> coordinatesForTarget;
    @Getter
    @Setter
    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private List<CharacterTag> characterTags;
    //#endregion

    public void updateCharacter(EditCharacterRequest request) {
        this.setPseudonim(request.getPseudonim());
        this.setCharType(CharType.valueOf(request.getCharType()));
        this.setCharName(request.getCharName());
        this.setCharSurname(request.getCharSurname());
        this.setGender(Gender.valueOf(request.getGender()));
        this.setNationality(request.getNationality());
        this.setBirthday(request.getBirthday());
        this.setOccupation(request.getOccupation());
        this.setMbtiPersonality(request.getMbtiPersonality());

        if (request.getDeath() != null) {
            this.setDeath(request.getDeath() == null || request.getDeath() == 0 ? 0 : request.getDeath());
            this.setDeathReason(request.getDeathReason() == null ? "" : request.getDeathReason());
        }
    }
}