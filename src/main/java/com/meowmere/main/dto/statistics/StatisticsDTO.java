package com.meowmere.main.dto.statistics;

import com.meowmere.main.dto.statistics.age.AgeDTO;

import java.util.List;

public class StatisticsDTO {
    public GenderStatisticDTO genderStatistics;
    public List<NationalitiesStatisticsDTO> nationalitiesStatistics;
    public TypeStatisticsDTO typeStatistics;
    public List<AgeDTO> ageStatistics;

    public GenderStatisticDTO getGenderStatistics() {
        return genderStatistics;
    }

    public void setGenderStatistics(GenderStatisticDTO genderStatistics) {
        this.genderStatistics = genderStatistics;
    }

    public List<NationalitiesStatisticsDTO> getNationalitiesStatistics() {
        return nationalitiesStatistics;
    }

    public void setNationalitiesStatistics(List<NationalitiesStatisticsDTO> nationalitiesStatistics) {
        this.nationalitiesStatistics = nationalitiesStatistics;
    }

    public TypeStatisticsDTO getTypeStatistics() {
        return typeStatistics;
    }

    public void setTypeStatistics(TypeStatisticsDTO typeStatistics) {
        this.typeStatistics = typeStatistics;
    }

    public List<AgeDTO> getAgeStatistics() {
        return ageStatistics;
    }

    public void setAgeStatistics(List<AgeDTO> ageStatistics) {
        this.ageStatistics = ageStatistics;
    }
}
