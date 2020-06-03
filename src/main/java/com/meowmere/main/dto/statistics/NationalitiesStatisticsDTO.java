package com.meowmere.main.dto.statistics;

public class NationalitiesStatisticsDTO {
    private String nationality;
    private Long num;

    public NationalitiesStatisticsDTO(String nationality, Long num) {
        this.nationality = nationality;
        this.num = num;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public Long getNum() {
        return num;
    }

    public void setNum(Long num) {
        this.num = num;
    }
}
