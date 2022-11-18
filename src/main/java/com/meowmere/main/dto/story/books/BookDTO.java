package com.meowmere.main.dto.story.books;

import lombok.Getter;
import lombok.Setter;

public class BookDTO {
    @Getter
    @Setter
    private Long id;
    @Getter
    @Setter
    private String color;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private String symbol;
    @Getter
    @Setter
    private Long bookOrder;

}
