package com.meowmere.main.dto.character.character;

import com.meowmere.main.dto.character.colors.CharacterColorDTO;
import com.meowmere.main.dto.character.image.ImageDTO;
import com.meowmere.main.dto.character.measurements.MeasurementObj;
import com.meowmere.main.dto.character.quote.CharacterQuoteDTO;
import com.meowmere.main.dto.character.starring.BookForCharacter;
import com.meowmere.main.dto.character.story.CharacterStoryDTO;
import com.meowmere.main.dto.character.tags.TagDTO;
import com.meowmere.main.dto.character.temperament.CharacterTemperamentDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CharacterDTO {
    @Getter
    @Setter
    private Long externalId;
    @Getter
    @Setter
    private String charType;
    @Getter
    @Setter
    private Boolean archived;
    @Getter
    @Setter
    private String charName;
    @Getter
    @Setter
    private String charSurname;
    @Getter
    @Setter
    private String pseudonim;
    @Getter
    @Setter
    private String gender;
    @Getter
    @Setter
    private String nationality;
    @Getter
    @Setter
    private Long birthday;
    @Getter
    @Setter
    private Long death;
    @Getter
    @Setter
    private String deathReason;
    @Getter
    @Setter
    private String occupation;
    @Getter
    @Setter
    private CharacterQuoteDTO quote;
    @Getter
    @Setter
    private CharacterColorDTO colors;
    @Getter
    @Setter
    private CharacterTemperamentDTO temperament;

    @Getter
    @Setter
    private Map<String, MeasurementObj> measurements;

    @Getter
    @Setter
    private List<ImageDTO> imagesList;
    @Getter
    @Setter
    private List<BookForCharacter> starringIn;
    @Getter
    @Setter
    private String profilePic;
    @Getter
    @Setter
    private List<TagDTO> tags = new ArrayList<>();
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
    @Getter
    @Setter
    private String Story;

}
