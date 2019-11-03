package com.meowmere.main.services;

import com.meowmere.main.DTO.CharacterColorDTO;
import com.meowmere.main.DTO.CharacterDTO;
import com.meowmere.main.DTO.CharactersMenuDTO;
import com.meowmere.main.Entities.Character;
import com.meowmere.main.Repositories.CharacterRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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

        return dto;
    }

    public Character createCharacter(Character request) {
        return characterRepository.save(request);
    }
}
