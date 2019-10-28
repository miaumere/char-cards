package com.meowmere.main.services;

import com.meowmere.main.DTO.SideCharacterDTO;
import com.meowmere.main.Entities.SideCharacter;
import com.meowmere.main.Repositories.SideCharactersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SideCharactersService {
    @Autowired
    public SideCharactersRepository sideCharactersRepository;

    public List<SideCharacterDTO> findAllSideCharacters() {
        List<SideCharacter> sideCharacters = sideCharactersRepository.findAll();
        ModelMapper modelMapper = new ModelMapper();
        List<SideCharacterDTO> result = new ArrayList<>();
        
        for (int i = 0; i < sideCharacters.size(); i++) {
            SideCharacterDTO sideCharacter = modelMapper.map(sideCharacters.get(i), SideCharacterDTO.class);
            result.add(sideCharacter);
        }

        return result;
    }
}
