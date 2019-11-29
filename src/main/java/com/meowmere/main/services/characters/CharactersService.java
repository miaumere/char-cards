package com.meowmere.main.services.characters;


import com.meowmere.main.DTO.character.*;
import com.meowmere.main.Entities.characters.Character;
import com.meowmere.main.Entities.characters.*;
import com.meowmere.main.Repositories.character.*;
import com.meowmere.main.Requests.character.ChangeCharacterStateRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class CharactersService {

    @Autowired
    public CharacterRepository characterRepository;
    @Autowired
    public ColorsRepository colorsRepository;
    @Autowired
    public TemperamentRepository temperamentRepository;
    @Autowired
    public QuoteRepository quoteRepository;
    @Autowired
    public MeasurementsRepository measurementsRepository;
    @Autowired
    public StoryRepository storyRepository;

    protected ModelMapper modelMapper = new ModelMapper();

    public List<CharactersMenuDTO> findCharList() {
        List<Character> allCharactersFromDb = characterRepository.getNonArchivedCharacters();

        List<CharactersMenuDTO> dtoList = new ArrayList<>();

        for(Character characterFromDb : allCharactersFromDb) {
            CharactersMenuDTO dto = this.modelMapper.map(characterFromDb, CharactersMenuDTO.class);
            try {
                String imagesURI = String.format("static\\character-profile-pics\\%s", characterFromDb.getExternalId());
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

    public ResponseEntity findByExternalId(Long externalId) {
        Character oneCharacter = characterRepository.getNonArchivedCharacter(externalId);
        if(oneCharacter == null) {
            String err = "Nie udało się znaleźć postaci.";
            return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
        }
        CharacterDTO dto = this.modelMapper.map(oneCharacter, CharacterDTO.class);

        List<Story> storiesFromDb = storyRepository.getAllStoriesForId(externalId);
        List<CharacterStoryDTO> stories = new ArrayList<>();
        if(storiesFromDb != null){
            for (Story storyFromDb : storiesFromDb) {
                CharacterStoryDTO storyDTO = this.modelMapper.map(storyFromDb, CharacterStoryDTO.class);
                stories.add(storyDTO);
            }
        }
        dto.setStory(stories);

        Colors colorsForCharacter = colorsRepository.getOne(externalId);
        CharacterColorDTO colorDTO = colorsForCharacter != null
                ? modelMapper.map(colorsForCharacter, CharacterColorDTO.class)
                : null;
        dto.setColors(colorDTO);

        Temperament temperamentForCharacter = temperamentRepository.getOne(externalId);
        CharacterTemperamentDTO temperamentDTO = temperamentForCharacter != null
                ? modelMapper.map(temperamentForCharacter, CharacterTemperamentDTO.class)
                : null;
        dto.setTemperament(temperamentDTO);

        Measurements measurementsForCharacter = measurementsRepository.getOne(externalId);
        CharacterMeasurementsDTO measurementsDTO = measurementsForCharacter != null
                ? modelMapper.map(measurementsForCharacter, CharacterMeasurementsDTO.class)
                : null;
        dto.setMeasurements(measurementsDTO);

        List<Quote> quotes = quoteRepository.getAllQuotesById(externalId);
        Random random = new Random();
        if(quotes.size() > 1){
            Quote randomQuote = quotes.get(random.nextInt(quotes.size()));
            dto.setQuote(modelMapper.map(randomQuote, CharacterQuoteDTO.class));
        } else {
            dto.setQuote(modelMapper.map(colorsRepository.getOne(externalId), CharacterQuoteDTO.class));
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

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    public List<CharacterForListDTO> getEveryCharacter() {
        List<Character> characterFromDb = characterRepository.findAll(Sort.by(Sort.Direction.ASC, "externalId"));
        List<CharacterForListDTO> dtoList = new ArrayList<>();
        for (int i = 0; i < characterFromDb.size(); i++) {
            CharacterForListDTO dto = this.modelMapper.map(characterFromDb.get(i), CharacterForListDTO.class);
            dtoList.add(dto);
        }
        return dtoList;
    }

    public ResponseEntity changeStatusForCharacters(List<ChangeCharacterStateRequest> characters) {
              for(ChangeCharacterStateRequest character : characters) {
                    Character charToChange = characterRepository.getOne(character.getId());
                    if(charToChange == null) {
                        return new ResponseEntity<>("Nie można zmienić stanu użytkownika o nieistniejącym id.",
                                HttpStatus.BAD_REQUEST);
                    }
                    charToChange.setArchived(character.getArchived());
                    Boolean test = charToChange.getArchived();
                    characterRepository.save(charToChange);
              }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



    public Character createCharacter(Character request) {
        return characterRepository.save(request);
    }
}
