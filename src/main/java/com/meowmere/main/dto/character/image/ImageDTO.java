package com.meowmere.main.dto.character.image;

import lombok.Getter;
import lombok.Setter;

public class ImageDTO {
    @Getter
    @Setter
    public Long id;
    @Getter
    @Setter
    public String extension;
    @Getter
    @Setter
    public String name;
    @Getter
    @Setter
    public Integer imageOrder;
    @Getter
    @Setter
    public byte[] image;

}
