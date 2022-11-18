package com.meowmere.main.dto.story.chapters;

import com.meowmere.main.dto.story.starring.StarringCharacterDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

public class ChapterWithCharsDTO extends ChapterDTO {
    @Getter
    @Setter
    public ArrayList<StarringCharacterDTO> starringChars = new ArrayList<>();
    
}
