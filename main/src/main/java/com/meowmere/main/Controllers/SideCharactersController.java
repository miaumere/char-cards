package com.meowmere.main.Controllers;

import com.meowmere.main.DTO.SideCharacterDTO;
import com.meowmere.main.services.SideCharactersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/side-characters/")
public class SideCharactersController {

    @Autowired
    SideCharactersService sideCharactersService;

    @GetMapping("/side-characters")
    public List<SideCharacterDTO> SideCharacterBean() {
        return sideCharactersService.findAllSideCharacters();
    }
}
