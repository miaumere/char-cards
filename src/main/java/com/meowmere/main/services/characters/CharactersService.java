package com.meowmere.main.services.characters;


import com.meowmere.main.DTO.character.*;
import com.meowmere.main.Entities.characters.*;
import com.meowmere.main.Entities.characters.Character;
import com.meowmere.main.Repositories.characters.*;
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

        List<Story> storiesFromDb = storyRepository.getAllStoriesForId(externalId);
        List<CharacterStoryDTO> stories = new ArrayList<>();
        if(storiesFromDb != null){
            for (Story storyFromDb : storiesFromDb) {
                CharacterStoryDTO storyDTO = modelMapper.map(storyFromDb, CharacterStoryDTO.class);
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

        return dto;
    }

    public Character createCharacter(Character request) {
        return characterRepository.save(request);
    }
}
