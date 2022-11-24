package com.meowmere.main.dto.character.measurements;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
public class MeasurementObj {
    @Getter
    @Setter
    private Integer height;
    @Getter
    @Setter
    private Integer weight;
    @Getter
    @Setter
    private double bmi;
}
