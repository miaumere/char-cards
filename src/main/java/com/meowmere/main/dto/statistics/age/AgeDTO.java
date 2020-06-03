package com.meowmere.main.dto.statistics.age;

import java.util.HashMap;

public class AgeDTO {
    public String label;
    public Integer count;
    public HashMap<Integer, Integer> details;

    public AgeDTO(String label, HashMap<Integer, Integer> details) {
        this.label = label;
        this.details = details;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public HashMap<Integer, Integer> getDetails() {
        return details;
    }

    public void setDetails(HashMap<Integer, Integer> details) {
        this.details = details;
    }
}
