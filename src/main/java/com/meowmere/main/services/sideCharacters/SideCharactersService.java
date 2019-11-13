package com.meowmere.main.services.sideCharacters;

import com.meowmere.main.DTO.sideCharacters.SideCharacterDTO;
import com.meowmere.main.Entities.sideCharacters.SideCharacter;
import com.meowmere.main.Repositories.sideCharacters.SideCharactersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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
        }

        return result;
    }
}
