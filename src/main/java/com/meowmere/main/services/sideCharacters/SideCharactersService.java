package com.meowmere.main.services.sideCharacters;

import com.meowmere.main.DTO.sideCharacters.SideCharacterDTO;
import com.meowmere.main.Entities.sideCharacters.SideCharacter;
import com.meowmere.main.Repositories.sideCharacters.SideCharactersRepository;
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
public class SideCharactersService {
    @Autowired
    public SideCharactersRepository sideCharactersRepository;

    public List<SideCharacterDTO> findAllSideCharacters() {
        List<SideCharacter> sideCharacters = sideCharactersRepository
                .findAll(Sort.by(Sort.Direction.ASC, "externalId"));
        ModelMapper modelMapper = new ModelMapper();
        List<SideCharacterDTO> result = new ArrayList<>();
        
        for (int i = 0; i < sideCharacters.size(); i++) {
            SideCharacterDTO sideCharacter = modelMapper.map(sideCharacters.get(i), SideCharacterDTO.class);
            result.add(sideCharacter);
            try {
                String imagesURI = String.format("static\\side-character-profile-pics\\%s", i+1);
                Resource resource = new ClassPathResource(imagesURI);
                File file = resource.getFile();
                File[] images = file.listFiles();
                sideCharacter.setProfilePic(images[0].getName());
            } catch(IOException e) {
                sideCharacter.setProfilePic(null);
            }
        }
        return result;
    }
}
