package com.meowmere.main.Controllers.sideCharacters;

import com.meowmere.main.Requests.sideCharacters.NewSideCharRequest;
import com.meowmere.main.Requests.sideCharacters.SideCharacterChangeRequest;
import com.meowmere.main.services.sideCharacters.SideCharactersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PatchMapping("/change-state")
    public ResponseEntity changeStateOfSideChars(@RequestBody List<SideCharacterChangeRequest> request) {
        return sideCharactersService.changeStateOfSideCharacters(request);
    }

    @PostMapping("/new-side-character")
    public ResponseEntity addNewSideCharacter(
            @ModelAttribute NewSideCharRequest request) {
        return sideCharactersService.addNewSideCharacter(request);
    }
}
