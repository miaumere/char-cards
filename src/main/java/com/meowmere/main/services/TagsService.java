package com.meowmere.main.services;

import com.meowmere.main.dto.character.image.ImageDTO;
import com.meowmere.main.dto.character.preference.PreferenceDTO;
import com.meowmere.main.dto.character.tags.TagDTO;
import com.meowmere.main.dto.statistics.GenderStatisticDTO;
import com.meowmere.main.dto.statistics.NationalitiesStatisticsDTO;
import com.meowmere.main.dto.statistics.StatisticsDTO;
import com.meowmere.main.dto.statistics.TypeStatisticsDTO;
import com.meowmere.main.dto.statistics.age.AgeDTO;
import com.meowmere.main.entities.characters.Character;
import com.meowmere.main.entities.characters.Image;
import com.meowmere.main.entities.characters.Preference;
import com.meowmere.main.entities.characters.Tag;
import com.meowmere.main.entities.story.Book;
import com.meowmere.main.enums.CharType;
import com.meowmere.main.enums.Gender;
import com.meowmere.main.repositories.character.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class TagsService {
    @Autowired
    TagRepository tagRepository;
    @Autowired
    CharacterTagRepository characterTagRepository;

    public ResponseEntity getAllTags() {
        List<Tag> tags = tagRepository.findAll();
        ArrayList<TagDTO> tagDTOS = new ArrayList<>();

        if(tags != null) {
            tags.forEach(tag -> tagDTOS.add(new TagDTO(tag.getId(), tag.getName(), tag.getColor())));
        }


        return new ResponseEntity(tagDTOS, HttpStatus.OK);
    }

    public ResponseEntity upsertTag(TagDTO request) {
        Tag tagToEdit = request.getId() == null ?  new Tag() : tagRepository.getOne(request.getId());

        tagToEdit.setName(request.getName());
        tagToEdit.setColor(request.getColor());

        tagRepository.saveAndFlush(tagToEdit);

        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity deleteTag(Integer id) {
        Tag tag = tagRepository.getOne(id);
        if(tag != null) {
            tagRepository.delete(tag);
        }
        return  new ResponseEntity(HttpStatus.OK);
    }
}
