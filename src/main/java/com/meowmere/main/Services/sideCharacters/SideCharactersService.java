package com.meowmere.main.Services.sideCharacters;

import com.meowmere.main.DTO.sideCharacters.SideCharacterDTO;
import com.meowmere.main.DTO.sideCharacters.SideCharacterForListDTO;
import com.meowmere.main.Entities.sideCharacters.SideCharacter;
import com.meowmere.main.Enums.AvailableExtensions;
import com.meowmere.main.Repositories.sideCharacters.SideCharactersRepository;
import com.meowmere.main.Requests.sideCharacters.SideCharacterChangeRequest;
import org.apache.commons.io.FilenameUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

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

    public ResponseEntity getSideCharacterById() {

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

    public ResponseEntity addNewSideCharacter(MultipartHttpServletRequest multipartHttpServletRequest){
        String name = multipartHttpServletRequest.getParameter("name");
        String surname = multipartHttpServletRequest.getParameter("surname");
        String desc = multipartHttpServletRequest.getParameter("desc");
        MultipartFile file = multipartHttpServletRequest.getFile("profilePic");
        multipartHttpServletRequest.getFileMap();

        SideCharacter sideCharacter = new SideCharacter(name, surname, desc);

        sideCharactersRepository.save(sideCharacter);
        sideCharactersRepository.flush();

        String stringForPathURI = String.format("src\\main\\resources\\static\\side-character-profile-pics\\%s",
                sideCharacter.getExternalId(), sideCharacter);

        try {
            if(file != null) {
                try {
                    String dir = new File(stringForPathURI).getAbsolutePath();
                    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                    String extension = FilenameUtils.getExtension(fileName);

                    if (!Stream.of(AvailableExtensions.values()).anyMatch(v -> v.name().equals(extension))) {
                        return new ResponseEntity(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
                    }

                    new File(dir).mkdir();
                    byte[] bytes = file.getBytes();

                    File FileToSave = new File(dir, fileName);

                    FileOutputStream fos = new FileOutputStream(FileToSave);
                    fos.write(bytes);
                    fos.close();

                } catch (java.nio.file.AccessDeniedException e) {
                    return new ResponseEntity("Nie udało się stworzyć folderu", HttpStatus.BAD_REQUEST);
                }
            }
        } catch (Exception e) {
            return new ResponseEntity("Nie udało się dodać zdjęcia.", HttpStatus.BAD_REQUEST);
            }
        return new ResponseEntity(HttpStatus.CREATED);
        }
}