package com.meowmere.main.dto.character.tags;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
public class TagDTO {
    @Getter
    @Setter
    private Integer id;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private String color;

}
