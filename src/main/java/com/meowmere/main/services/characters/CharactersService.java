package com.meowmere.main.services.characters;

import com.meowmere.main.DTO.character.CharacterColorDTO;
import com.meowmere.main.DTO.character.CharacterDTO;
import com.meowmere.main.DTO.character.CharactersMenuDTO;
import com.meowmere.main.Entities.characters.Character;
import com.meowmere.main.Entities.characters.Colors;
import com.meowmere.main.Repositories.characters.CharacterRepository;
import com.meowmere.main.Repositories.characters.ColorsRepository;
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
    @Autowired
    public ColorsRepository colorsRepository;

    public List<CharactersMenuDTO> findCharList() {
        List<Character> allCharacters = characterRepository.findAll(Sort.by(Sort.Direction.ASC, "externalId"));

        ModelMapper modelMapper = new ModelMapper();
        List<CharactersMenuDTO> dtoList = new ArrayList<>();

        for (int i = 0; i < allCharacters.size(); i++) {
            CharactersMenuDTO dto = modelMapper.map(allCharacters.get(i), CharactersMenuDTO.class);

            try {
                String imagesURI = String.format("static\\character-profile-pics\\%s", i+1);
                Resource resource = new ClassPathResource(imagesURI);
                File file = resource.getFile();
                File[] images = file.listFiles();
                    if(images.length > 0) {
                        String profilePic = images[0].getName();
                        dto.setProfilePic(profilePic);
                    }


            } catch(IOException e) { }

                dtoList.add(dto);
        }

        return dtoList;
    }

    public CharacterDTO findByExternalId(Long externalId) {
        Character oneCharacter = characterRepository.getOne(externalId);
        ModelMapper modelMapper = new ModelMapper();

        CharacterDTO dto = modelMapper.map(oneCharacter, CharacterDTO.class);

        Colors colorsForCharacter = colorsRepository.getOne(externalId);
        CharacterColorDTO colorDTO = new CharacterColorDTO();

        if(colorsRepository != null){
                colorDTO = modelMapper.map(colorsForCharacter, CharacterColorDTO.class);
                dto.setColors(colorDTO);
        } else {
            dto.setColors(colorDTO);
        }

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
