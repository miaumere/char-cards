package com.meowmere.main.requests.characters.character;

import com.meowmere.main.dto.character.colors.CharacterColorDTO;
import com.meowmere.main.dto.character.measurements.CharacterMeasurementsDTO;
import com.meowmere.main.dto.character.temperament.CharacterTemperamentDTO;
import lombok.Getter;
import lombok.Setter;

public class EditCharacterRequest {
    @Getter
    @Setter
    private Long externalId;
    @Getter
    @Setter
    private String charName;
    @Getter
    @Setter
    private String charSurname;
    @Getter
    @Setter
    private String charType;
    @Getter
    @Setter
    private String pseudonim;
    @Getter
    @Setter
    private Long birthday;
    @Getter
    @Setter
    private String gender;
    @Getter
    @Setter
    private String occupation;
    @Getter
    @Setter
    private String nationality;
    @Getter
    @Setter
    private Long death;
    @Getter
    @Setter
    private String deathReason;
    @Getter
    @Setter
    private CharacterTemperamentDTO temperament;
    @Getter
    @Setter
    private CharacterColorDTO colors;
    @Getter
    @Setter
    private CharacterMeasurementsDTO measurements;
    @Getter
    @Setter
    private String mbtiPersonality;
    @Getter
    @Setter
    private String favouriteFood;
    @Getter
    @Setter
    private String leastFavouriteFood;
    @Getter
    @Setter
    private String hobby;
    @Getter
    @Setter
    private String likes;
    @Getter
    @Setter
    private String dislikes;
}
