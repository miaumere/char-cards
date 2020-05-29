package com.meowmere.main.services;

import com.meowmere.main.dto.statistics.GenderStatisticDTO;
import com.meowmere.main.dto.statistics.NationalitiesStatisticsDTO;
import com.meowmere.main.dto.statistics.StatisticsDTO;
import com.meowmere.main.dto.statistics.TypeStatisticsDTO;
import com.meowmere.main.dto.statistics.age.AgeDTO;
import com.meowmere.main.dto.statistics.age.AgeStatisticsDTO;
import com.meowmere.main.enums.CharType;
import com.meowmere.main.enums.Gender;
import com.meowmere.main.repositories.character.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class StatisticsService {
    @Autowired
    CharacterRepository characterRepository;

    public ResponseEntity getStatistics() {
        StatisticsDTO statisticsDTO = new StatisticsDTO();
        Integer allCharsNumber = characterRepository.findAll().size();

        GenderStatisticDTO genderStatisticDTO = new GenderStatisticDTO();
        int malesNumber = characterRepository.getCharactersForGender(Gender.MALE);
        int femalesNumber = characterRepository.getCharactersForGender(Gender.FEMALE);

        genderStatisticDTO.setMaleNumber(malesNumber);
        genderStatisticDTO.setFemaleNumber(femalesNumber);

        List<NationalitiesStatisticsDTO> nationalitiesStatisticsDTOS = characterRepository.getNationalitiesStatistics();

        TypeStatisticsDTO typeStatisticsDTO = new TypeStatisticsDTO();
        typeStatisticsDTO.setMainCharactersNum(characterRepository.getCharTypeNumber(CharType.MAIN));
        typeStatisticsDTO.setSideCharactersNum(characterRepository.getCharTypeNumber(CharType.SIDE));
        typeStatisticsDTO.setBgCharactersNum(characterRepository.getCharTypeNumber(CharType.BACKGROUND));

        AgeStatisticsDTO ageStatisticsDTO = new AgeStatisticsDTO();
        List<Long> birthdays = characterRepository.getCharactersBirthdays();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY");
        Date currentDate = new Date();
        Long currentYear = Long.parseLong(simpleDateFormat.format(currentDate));
        Integer childAges = 0;
        String childLabel = "0-15";
        Integer youngAdultAges = 0;
        String youngAdultLabel = "16-29";
        Integer thirtiesAges = 0;
        String thirtiesLabel = "30-39";
        Integer fourtiesAges = 0;
        String fourtiesLabel = "40-59";
        Integer sixtiesAges = 0;
        String sixtiesLabel = "60+";
        Integer undefinedAges = allCharsNumber - birthdays.size();

        AgeDTO childAgesDTO = new AgeDTO(childLabel, new HashMap<>());
        AgeDTO youngAdultDTO = new AgeDTO(youngAdultLabel, new HashMap<>());
        AgeDTO thirtiesDTO = new AgeDTO(thirtiesLabel, new HashMap<>());
        AgeDTO fourtiesDTO = new AgeDTO(fourtiesLabel, new HashMap<>());
        AgeDTO sixtiesDTO = new AgeDTO(sixtiesLabel, new HashMap<>());

        if(birthdays != null && birthdays.size() > 0){
        for (Long birthday : birthdays) {
            Date date = new Date(birthday);
            Long birthYear = Long.parseLong(simpleDateFormat.format(date));
            Long age = currentYear - birthYear;

            if(age >= 0 && age <= 15){
                childAges += 1;
                Integer peopleWithTheSameAge = childAgesDTO.getDetails().get(age.intValue());
                if(peopleWithTheSameAge == null) {
                    childAgesDTO.getDetails().put(age.intValue(), 1);
                } else {
                    childAgesDTO.getDetails().put(age.intValue(), peopleWithTheSameAge +1);
                }
            } else if (age >= 16 && age <= 29){
                Integer peopleWithTheSameAge = youngAdultDTO.getDetails().get(age.intValue());
                if(peopleWithTheSameAge == null) {
                    youngAdultDTO.getDetails().put(age.intValue(), 1);
                } else {
                    youngAdultDTO.getDetails().put(age.intValue(), peopleWithTheSameAge +1);
                }
                youngAdultAges += 1;
            } else if(age >= 30 && age <= 39){
                thirtiesAges += 1;

                Integer peopleWithTheSameAge = thirtiesDTO.getDetails().get(age.intValue());
                if(peopleWithTheSameAge == null) {
                    thirtiesDTO.getDetails().put(age.intValue(), 1);
                } else {
                    thirtiesDTO.getDetails().put(age.intValue(), peopleWithTheSameAge +1);
                }
            } else if(age >= 40 && age <= 59){
                fourtiesAges += 1;

                Integer peopleWithTheSameAge = fourtiesDTO.getDetails().get(age.intValue());
                if(peopleWithTheSameAge == null) {
                    fourtiesDTO.getDetails().put(age.intValue(), 1);
                } else {
                    fourtiesDTO.getDetails().put(age.intValue(), peopleWithTheSameAge +1);
                }
            } else if(age <= 60){
                sixtiesAges += 1;

                Integer peopleWithTheSameAge = sixtiesDTO.getDetails().get(age.intValue());
                if(peopleWithTheSameAge == null) {
                    sixtiesDTO.getDetails().put(age.intValue(), 1);
                } else {
                    sixtiesDTO.getDetails().put(age.intValue(), peopleWithTheSameAge +1);
                }
            } else{
                undefinedAges += 1;
            }
        }}

        childAgesDTO.setCount(childAges);
        youngAdultDTO.setCount(youngAdultAges);
        thirtiesDTO.setCount(thirtiesAges);
        fourtiesDTO.setCount(fourtiesAges);
        sixtiesDTO.setCount(sixtiesAges);
        ageStatisticsDTO.setUndefinedAges(undefinedAges);

        List<AgeDTO> ageDTOS = new ArrayList<>();
        ageDTOS.add(childAgesDTO);
        ageDTOS.add(youngAdultDTO);
        ageDTOS.add(thirtiesDTO);
        ageDTOS.add(fourtiesDTO);
        ageDTOS.add(sixtiesDTO);

        ageStatisticsDTO.setAgeStats(ageDTOS);

        statisticsDTO.setGenderStatistics(genderStatisticDTO);
        statisticsDTO.setNationalitiesStatistics(nationalitiesStatisticsDTOS);
        statisticsDTO.setTypeStatistics(typeStatisticsDTO);
        statisticsDTO.setAgeStatistics(ageStatisticsDTO);

        return new ResponseEntity(statisticsDTO, HttpStatus.OK);
    }
}
