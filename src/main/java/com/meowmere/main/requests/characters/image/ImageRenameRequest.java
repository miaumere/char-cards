package com.meowmere.main.requests.characters.image;

import lombok.Getter;
import lombok.Setter;

public class ImageRenameRequest {
    @Getter
    @Setter
    private Long id;
    @Getter
    @Setter
    private String name;
}
