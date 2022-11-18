package com.meowmere.main.dto.character.relation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
public class CoordinatesDTO {
    @Getter
    @Setter
    private Integer x;
    @Getter
    @Setter
    private Integer y;
}
