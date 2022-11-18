package com.meowmere.main.entities.characters;

import com.meowmere.main.entities.story.StarringCharacters;
import com.meowmere.main.enums.CharType;
import com.meowmere.main.enums.Gender;
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
    private Gender gender;
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
    public Boolean archived = false;
    @Getter
    @Setter
    @Column
    public String nationality;
    @Getter
    @Setter
    @Column
    public String mbtiPersonality;
    @Getter
    @Setter
    @Column(name = "character_type")
    @Enumerated(EnumType.STRING)
    public CharType charType;
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
}