package com.meowmere.main.dto.statistics.age;

import java.util.List;

public class AgeStatisticsDTO {
    public List<AgeDTO> ageStats;
    public int undefinedAges;

    public List<AgeDTO> getAgeStats() {
        return ageStats;
    }

    public void setAgeStats(List<AgeDTO> ageStats) {
        this.ageStats = ageStats;
    }

    public int getUndefinedAges() {
        return undefinedAges;
    }

    public void setUndefinedAges(int undefinedAges) {
        this.undefinedAges = undefinedAges;
    }
}
