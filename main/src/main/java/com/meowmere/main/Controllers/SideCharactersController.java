package com.meowmere.main.Controllers;

import com.meowmere.main.DTO.SideCharacterDTO;
import com.meowmere.main.services.SideCharactersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

public class SideCharactersController {
    @Autowired
    private SideCharactersService sideCharactersService;

    @RequestMapping("/get-side-characters")
    public List<SideCharacterDTO> SideCharacterBean() {
        return sideCharactersService.findAllSideCharacters();
    }
}
