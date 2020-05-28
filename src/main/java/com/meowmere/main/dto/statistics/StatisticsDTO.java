package com.meowmere.main.dto.statistics;

import java.util.List;

public class StatisticsDTO {
    public GenderStatisticDTO genderStatisticDTO;
    public List<NationalitiesStatisticsDTO> nationalitiesStatistics;

    public GenderStatisticDTO getGenderStatisticDTO() {
        return genderStatisticDTO;
    }

    public void setGenderStatisticDTO(GenderStatisticDTO genderStatisticDTO) {
        this.genderStatisticDTO = genderStatisticDTO;
    }

    public List<NationalitiesStatisticsDTO> getNationalitiesStatistics() {
        return nationalitiesStatistics;
    }

    public void setNationalitiesStatistics(List<NationalitiesStatisticsDTO> nationalitiesStatistics) {
        this.nationalitiesStatistics = nationalitiesStatistics;
    }
}
