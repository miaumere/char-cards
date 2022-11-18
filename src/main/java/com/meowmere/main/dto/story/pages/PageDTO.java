package com.meowmere.main.dto.story.pages;

import lombok.Getter;
import lombok.Setter;

public class PageDTO {
    @Getter
    @Setter
    public Long id;
    @Getter
    @Setter
    public Integer pageNumber;
    @Getter
    @Setter
    public String fileName;
}
