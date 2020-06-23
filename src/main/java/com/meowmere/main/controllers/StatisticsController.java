package com.meowmere.main.controllers;

import com.meowmere.main.services.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistics/")
public class StatisticsController {
    @Autowired
    StatisticsService statisticsService;

    @GetMapping("/get-main-statistics")
    public ResponseEntity getGenderStatistics() {
        return statisticsService.getStatistics();
    }

    @GetMapping("/get-preferences-for-char")
    public ResponseEntity getPreferencesForChar(@RequestParam Long id) {return statisticsService.getPreferencesForCharacter(id);}

}
