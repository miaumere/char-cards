package com.meowmere.main.Controllers.sideCharacters;

import com.meowmere.main.services.sideCharacters.SideCharactersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/side-characters/")
public class SideCharactersController {

    @Autowired
    SideCharactersService sideCharactersService;

    @GetMapping("/side-characters")
    public ResponseEntity returnSideCharacters() {
        return sideCharactersService.findNonArchivedSideCharacters();
    }

    @GetMapping("/all-side-characters")
    public ResponseEntity findAllSideCharacters() {
        return sideCharactersService.findAllSideCharacters();
    }


}
