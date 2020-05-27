package com.meowmere.main.services;

import com.meowmere.main.dto.statistics.GenderStatisticDTO;
import com.meowmere.main.dto.statistics.StatisticsDTO;
import com.meowmere.main.enums.Gender;
import com.meowmere.main.repositories.character.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class StatisticsService {
    @Autowired
    CharacterRepository characterRepository;

    public ResponseEntity getStatistics() {
        StatisticsDTO statisticsDTO = new StatisticsDTO();

        GenderStatisticDTO genderStatisticDTO = new GenderStatisticDTO();
        int malesNumber = characterRepository.getCharactersForGender(Gender.MALE);
        int femalesNumber = characterRepository.getCharactersForGender(Gender.FEMALE);

        genderStatisticDTO.setMaleNumber(malesNumber);
        genderStatisticDTO.setFemaleNumber(femalesNumber);

        statisticsDTO.setGenderStatisticDTO(genderStatisticDTO);

        return new ResponseEntity(statisticsDTO, HttpStatus.OK);
    }
}
