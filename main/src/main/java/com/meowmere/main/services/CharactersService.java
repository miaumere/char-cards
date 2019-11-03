package com.meowmere.main.services;

import com.meowmere.main.DTO.CharacterColorDTO;
import com.meowmere.main.DTO.CharacterDTO;
import com.meowmere.main.DTO.CharactersMenuDTO;
import com.meowmere.main.Entities.Character;
import com.meowmere.main.Repositories.CharacterRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CharactersService {

    @Autowired
    public CharacterRepository characterRepository;

    public List<CharactersMenuDTO> findCharList() {
        List<Character> allCharacters = characterRepository.findAll(Sort.by(Sort.Direction.ASC, "externalId"));

        ModelMapper modelMapper = new ModelMapper();
        List<CharactersMenuDTO> dtoList = new ArrayList<>();

        for (int i = 0; i < allCharacters.size(); i++) {
            CharactersMenuDTO dto = modelMapper.map(allCharacters.get(i), CharactersMenuDTO.class);
            dtoList.add(dto);
        }

        return dtoList;
    }

    public CharacterDTO findByExternalId(Long externalId) {
        Character oneCharacter = characterRepository.getOne(externalId);
        ModelMapper modelMapper = new ModelMapper();
        CharacterColorDTO colorDTO = modelMapper.map(oneCharacter, CharacterColorDTO.class);

        CharacterDTO dto = modelMapper.map(oneCharacter, CharacterDTO.class);
        dto.setColors(colorDTO);


        try {
            String imagesURI = String.format("static\\characters-images\\%s", externalId);
            Resource resource = new ClassPathResource(imagesURI);
            File file = resource.getFile();
            File[] images = file.listFiles();

            List<String> imagesList = new ArrayList<String>();

            for (File image : images) {
                imagesList.add(image.getName());
            }

            dto.setImagesList(imagesList.toArray(new String[0]));
        }
        catch(IOException e) {
            dto.setImagesList(new String[0]);
        }

        return dto;
    }

    public Character createCharacter(Character request) {
        return characterRepository.save(request);
    }
}
