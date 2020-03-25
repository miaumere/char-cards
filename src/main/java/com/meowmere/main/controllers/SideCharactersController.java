package com.meowmere.main.controllers;

import com.meowmere.main.requests.sideCharacters.EditRelationNameRequest;
import com.meowmere.main.requests.sideCharacters.EditSideCharRequest;
import com.meowmere.main.requests.sideCharacters.NewRelationForSideCharRequest;
import com.meowmere.main.requests.sideCharacters.SideCharacterChangeRequest;
import com.meowmere.main.services.sideCharacters.SideCharactersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/side-characters/")
public class SideCharactersController {

    @Autowired
    SideCharactersService sideCharactersService;

    @GetMapping("/side-characters")
    public ResponseEntity returnSideCharacters(
            @RequestParam Optional<String> name,
            @RequestParam Optional<List<Long>> books,
            @RequestParam Optional<Long> relatedTo
    ) {
        return sideCharactersService.findNonArchivedSideCharacters(name, books, relatedTo);
    }

    @GetMapping("/all-side-characters")
    public ResponseEntity findAllSideCharacters() {
        return sideCharactersService.findAllSideCharacters();
    }

    @GetMapping("/side-details")
    public ResponseEntity getSideCharacterDetails(@RequestParam Long id){
        return sideCharactersService.getSideCharacterDetails(id);
    }
    @GetMapping("/books")
    public ResponseEntity getAllBooks() {
        return sideCharactersService.getAllBooks();
    }

    @GetMapping("/relations")
    public ResponseEntity getRelationsForSideChar(@RequestParam Long id) {
        return sideCharactersService.getRelationsForSideChar(id);
    }

    @PutMapping("/edit-side-details")
    public ResponseEntity editSideCharacterDetails(@RequestBody EditSideCharRequest request){
        return sideCharactersService.editSideCharacterDetails(request);
    }

    @PatchMapping("/change-state")
    public ResponseEntity changeStateOfSideChar(@RequestBody SideCharacterChangeRequest request) {
        return sideCharactersService.changeStateOfSideCharacter(request);
    }

    @PatchMapping("/edit-relation")
        public ResponseEntity changeRelationName(@RequestBody EditRelationNameRequest request){
        return sideCharactersService.editSideCharRelationName(request);
    }

    @PostMapping("/new-side-character")
    public ResponseEntity addNewSideCharacter(MultipartHttpServletRequest multipartHttpServletRequest) {
        return sideCharactersService.addNewSideCharacter(multipartHttpServletRequest);
    }

    @PostMapping("/edit-side-pic")
    public ResponseEntity editSideProfilePic(MultipartHttpServletRequest multipartHttpServletRequest, HttpServletResponse response) {
        return sideCharactersService.editSideProfilePic(multipartHttpServletRequest);
    }

    @PostMapping("/new-relation")
    public ResponseEntity createRelation(@RequestBody NewRelationForSideCharRequest request){
        return sideCharactersService.createNewRelationForSideChar(request);
    }

    @DeleteMapping("/delete-relation")
    public ResponseEntity deleteRelationForSideChar(@RequestParam Long id) {
        return sideCharactersService.deleteRelationForChar(id);
    }


}
