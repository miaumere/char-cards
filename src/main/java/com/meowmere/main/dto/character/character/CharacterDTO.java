package com.meowmere.main.dto.character.character;

import com.meowmere.main.dto.character.colors.CharacterColorDTO;
import com.meowmere.main.dto.character.image.ImageDTO;
import com.meowmere.main.dto.character.measurements.CharacterMeasurementsDTO;
import com.meowmere.main.dto.character.quote.CharacterQuoteDTO;
import com.meowmere.main.dto.character.starring.BookForCharacter;
import com.meowmere.main.dto.character.story.CharacterStoryDTO;
import com.meowmere.main.dto.character.tags.TagDTO;
import com.meowmere.main.dto.character.temperament.CharacterTemperamentDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

public class CharacterDTO {
    @Getter
    @Setter
    public Long externalId;
    @Getter
    @Setter
    public String charType;
    @Getter
    @Setter
    public Boolean archived;
    @Getter
    @Setter
    public String charName;
    @Getter
    @Setter
    public String charSurname;
    @Getter
    @Setter
    public String pseudonim;
    @Getter
    @Setter
    public String gender;
    @Getter
    @Setter
    public String nationality;
    @Getter
    @Setter
    public Long birthday;
    @Getter
    @Setter
    public Long death;
    @Getter
    @Setter
    public String deathReason;
    @Getter
    @Setter
    public String occupation;
    @Getter
    @Setter
    public CharacterQuoteDTO quote;
    @Getter
    @Setter
    public List<CharacterStoryDTO> story;
    @Getter
    @Setter
    public CharacterColorDTO colors;
    @Getter
    @Setter
    public CharacterTemperamentDTO temperament;
    @Getter
    @Setter
    public CharacterMeasurementsDTO measurements;
    @Getter
    @Setter
    public List<ImageDTO> imagesList;
    @Getter
    @Setter
    public List<BookForCharacter> starringIn;
    @Getter
    @Setter
    private String profilePic;
    @Getter
    @Setter
    private List<TagDTO> tags = new ArrayList<>();
    @Getter
    @Setter
    public String mbtiPersonality;
    @Getter
    @Setter
    public String favouriteFood;
    @Getter
    @Setter
    public String leastFavouriteFood;
    @Getter
    @Setter
    public String hobby;
}
