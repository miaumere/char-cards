package com.meowmere.main.controllers;

import com.meowmere.main.dto.character.tags.AssignTagToCharacterRequest;
import com.meowmere.main.dto.character.tags.TagDTO;
import com.meowmere.main.services.StatisticsService;
import com.meowmere.main.services.TagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/tags/")
public class TagsController {
    @Autowired
    TagsService tagsService;

    @GetMapping("get-tags")
    public ResponseEntity getTags() {
        return tagsService.getAllTags();
    }

    @PostMapping("upsert-tag")
    public ResponseEntity upsertTag(@RequestBody TagDTO request) {
        return tagsService.upsertTag(request);
    }

    @PostMapping("assign-tag")
    public ResponseEntity assignTagToCharacter(@RequestBody AssignTagToCharacterRequest request) {
        return tagsService.assignTag(request);
    }

    @DeleteMapping("delete-tag")
    public ResponseEntity deleteTag(@RequestParam Integer id) {return tagsService.deleteTag(id);}

    @DeleteMapping("delete-character-tag")
    public ResponseEntity deleteCharacterTag(@RequestParam Integer tagId, @RequestParam Long characterId) {return tagsService.deleteCharacterTag(tagId, characterId);}

}
