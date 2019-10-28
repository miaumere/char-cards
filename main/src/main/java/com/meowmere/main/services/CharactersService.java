package com.meowmere.main.services;

import com.meowmere.main.DTO.CharacterDTO;
import com.meowmere.main.DTO.CharactersMenuDTO;
import com.meowmere.main.DTO.SideCharacterDTO;
import com.meowmere.main.Entities.Character;
import com.meowmere.main.Entities.SideCharacter;
import com.meowmere.main.Repositories.CharacterRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CharactersService {

    @Autowired
    public CharacterRepository characterRepository;

    public List<CharactersMenuDTO> findCharList() {
        List<Character> allCharacters = characterRepository.findAll();

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
        CharacterDTO dto = modelMapper.map(oneCharacter, CharacterDTO.class);

        return dto;
    }
}
