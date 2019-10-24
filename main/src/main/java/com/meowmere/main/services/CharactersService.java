package com.meowmere.main.services;

import com.meowmere.main.DTO.CharacterDTO;
import com.meowmere.main.Entities.Character;
import com.meowmere.main.Repositories.CharacterRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CharactersService {

    @Autowired
    public CharacterRepository characterRepository;


    public CharacterDTO findAll() {

        Iterable<Character> allCharacters = characterRepository.findAll();
//          List<CharacterDTO> result = new List<CharacterDTO>() {};

        ModelMapper modelMapper = new ModelMapper();
        CharacterDTO dto = modelMapper.map(allCharacters, CharacterDTO.class);

        return dto;
    }

    public CharacterDTO findByExternalId(Long externalId) {
        Character oneCharacter = characterRepository.getOne(externalId);
        ModelMapper modelMapper = new ModelMapper();
        CharacterDTO dto = modelMapper.map(oneCharacter, CharacterDTO.class);
        return dto;
    }
}
