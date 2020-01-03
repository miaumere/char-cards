package com.meowmere.main.Requests.characters;

import com.meowmere.main.DTO.character.CharacterColorDTO;
import com.meowmere.main.DTO.character.CharacterMeasurementsDTO;
import com.meowmere.main.DTO.character.CharacterTemperamentDTO;

public class EditCharacterRequest {
    String charName;
    String surname;
    Long birthday;
    Long death;
    String deathReason;
    CharacterTemperamentDTO temperament;
    CharacterColorDTO colors;
    CharacterMeasurementsDTO measurements;
}
