package com.meowmere.main.services.sideCharacters;

import com.meowmere.main.DTO.sideCharacters.SideCharacterDTO;
import com.meowmere.main.DTO.sideCharacters.SideCharacterForListDTO;
import com.meowmere.main.Entities.sideCharacters.SideCharacter;
import com.meowmere.main.Repositories.sideCharacters.SideCharactersRepository;
import com.meowmere.main.Requests.sideCharacters.NewSideCharRequest;
import com.meowmere.main.Requests.sideCharacters.SideCharacterChangeRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class SideCharactersService {
    @Autowired
    public SideCharactersRepository sideCharactersRepository;

    public ResponseEntity findNonArchivedSideCharacters() {
        List<SideCharacter> sideCharactersFromDb = sideCharactersRepository.getNonArchivedSideCharacters();
        ModelMapper modelMapper = new ModelMapper();
        List<SideCharacterDTO> result = new ArrayList<>();
        for (SideCharacter sideCharacterFromDb : sideCharactersFromDb) {
            SideCharacterDTO sideCharacter = modelMapper.map(sideCharacterFromDb, SideCharacterDTO.class);
            result.add(sideCharacter);
            try {
                String imagesURI = String.format("static\\side-character-profile-pics\\%s", sideCharacterFromDb.getExternalId());
                Resource resource = new ClassPathResource(imagesURI);
                File file = resource.getFile();
                File[] images = file.listFiles();
                sideCharacter.setProfilePic(images[0].getName());
            } catch (IOException e) {
                sideCharacter.setProfilePic(null);
            }
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    public ResponseEntity findAllSideCharacters() {
        List<SideCharacter> sideCharactersFromDB = sideCharactersRepository
                .findAll(Sort.by(Sort.Direction.ASC, "externalId"));
        ModelMapper modelMapper = new ModelMapper();
        List<SideCharacterForListDTO> result = new ArrayList<>();

        for(SideCharacter sideCharacterFromDb : sideCharactersFromDB) {
            SideCharacterForListDTO sideCharacter = modelMapper.map(sideCharacterFromDb, SideCharacterForListDTO.class);
            result.add(sideCharacter);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    public ResponseEntity changeStateOfSideCharacters(List<SideCharacterChangeRequest> sideChars) {
        for(SideCharacterChangeRequest sideChar : sideChars){
            SideCharacter sideCharFromDb = sideCharactersRepository.getOne(sideChar.getExternalId());
            if(sideCharFromDb == null) {
                String err = "Brak postaci o podanym id.";
                return new ResponseEntity(err, HttpStatus.BAD_REQUEST);
            }
            sideCharFromDb.setArchived(sideChar.getArchived());
            sideCharactersRepository.save(sideCharFromDb);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity addNewSideCharacter(NewSideCharRequest sideChar){

        SideCharacter sideCharacter = new SideCharacter(
                sideChar.getSideCharacterName(),
                sideChar.getSideCharacterSurname(),
                sideChar.getSideCharacterDesc()
        );
        if(sideCharacter.checkNullValues()) {
            sideCharactersRepository.save(sideCharacter);
            return new ResponseEntity("Znaleziono w zapytaniu puste wartosci.", HttpStatus.NOT_ACCEPTABLE);
        }

        MultipartFile file = sideChar.getProfilePic();
        String pathForFile = String.format("static\\side-character-profile-pics\\%s\\", sideCharacter.getExternalId());
        try {
            if(file != null) {
                byte[] bytes = file.getBytes();
                Path path = Paths.get(pathForFile + file.getOriginalFilename());
                Files.write(path, bytes);
            }
        } catch (Exception e) {
            return new ResponseEntity("Upload failed", HttpStatus.BAD_REQUEST);
            }
        return new ResponseEntity(HttpStatus.CREATED);
        }
}