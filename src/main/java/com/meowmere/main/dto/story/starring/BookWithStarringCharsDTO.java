package com.meowmere.main.dto.story.starring;

import com.meowmere.main.dto.story.books.BookDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

public class BookWithStarringCharsDTO {
    @Getter
    @Setter
    private BookDTO book;
    @Getter
    @Setter
    private ArrayList<ChaptersWithCharStarringTypeDTO> chapters;

}
