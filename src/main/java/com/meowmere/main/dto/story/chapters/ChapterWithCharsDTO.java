package com.meowmere.main.dto.story.chapters;

import com.meowmere.main.dto.story.starring.StarringCharacterDTO;

import java.util.ArrayList;

public class ChapterWithCharsDTO extends ChapterDTO {
    public ArrayList<StarringCharacterDTO> starringChars;

    public ArrayList<StarringCharacterDTO> getStarringChars() {
        return starringChars;
    }

    public void setStarringChars(ArrayList<StarringCharacterDTO> starringChars) {
        this.starringChars = starringChars;
    }
}
