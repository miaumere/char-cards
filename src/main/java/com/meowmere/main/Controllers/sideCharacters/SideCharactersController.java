package com.meowmere.main.Controllers.sideCharacters;

import com.meowmere.main.Requests.sideCharacters.EditSideCharRequest;
import com.meowmere.main.Requests.sideCharacters.SideCharacterChangeRequest;
import com.meowmere.main.Services.sideCharacters.SideCharactersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletResponse;

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
    public ResponseEntity findAllSideCharacters(HttpServletResponse response) {
        response.addHeader(HttpHeaders.CACHE_CONTROL, "no-cache");
        return sideCharactersService.findAllSideCharacters();
    }

    @GetMapping("/side-details")
    public ResponseEntity getSideCharacterDetails(@RequestParam Long id){
        return sideCharactersService.getSideCharacterDetails(id);
    }

    @PutMapping("/edit-side-details")
    public ResponseEntity editSideCharacterDetails(@RequestBody EditSideCharRequest request){
        return sideCharactersService.editSideCharacterDetails(request);
    }

    @PatchMapping("/change-state")
    public ResponseEntity changeStateOfSideChar(@RequestBody SideCharacterChangeRequest request) {
        return sideCharactersService.changeStateOfSideCharacter(request);
    }

    @PostMapping("/new-side-character")
    public ResponseEntity addNewSideCharacter(MultipartHttpServletRequest multipartHttpServletRequest) {
        return sideCharactersService.addNewSideCharacter(multipartHttpServletRequest);
    }

    @PostMapping("/edit-side-pic")
    public ResponseEntity editSideProfilePic(MultipartHttpServletRequest multipartHttpServletRequest, HttpServletResponse response) {
        return sideCharactersService.editSideProfilePic(multipartHttpServletRequest);
    }

    @GetMapping("/books")
    public ResponseEntity getAllBooks() {
        return sideCharactersService.getAllBooks();
    }
}
