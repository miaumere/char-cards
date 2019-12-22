package com.meowmere.main.Services.characters;


import com.meowmere.main.DTO.character.*;
import com.meowmere.main.Entities.characters.Character;
import com.meowmere.main.Entities.characters.*;
import com.meowmere.main.Enums.AvailableExtensions;
import com.meowmere.main.Repositories.character.*;
import com.meowmere.main.Requests.characters.ChangeCharacterStateRequest;
import com.meowmere.main.Requests.characters.CreateStoryForCharRequest;
import com.meowmere.main.Requests.characters.StoryRequest;
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
import java.util.*;
import java.util.stream.Stream;

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
    @Autowired
    public TitlesRepository titlesRepository;

    private void getPicForMenu(Character character, CharactersMenuDTO dto) {
        try {
            String imagesURI = String.format("static\\character-profile-pics\\%s", character.getExternalId());
            Resource resource = new ClassPathResource(imagesURI);
            File file = resource.getFile();
            File[] images = file.listFiles();
            if(images != null){
                dto.setProfilePic(images[0].getName());
            }
        } catch (IOException e) {
            dto.setProfilePic(null);
        }
    }
    private void getPicForMenu(Character character, EveryCharacterMenuDTO dto){
        try {
            String imagesURI = String.format("static\\character-profile-pics\\%s", character.getExternalId());
            Resource resource = new ClassPathResource(imagesURI);
            File file = resource.getFile();
            File[] images = file.listFiles();
            if(images != null){
                dto.setProfilePic(images[0].getName());
            }
        } catch (IOException e) {
            dto.setProfilePic(null);
        }
    }
    private ResponseEntity setPicForMenu(String stringForPathURI, MultipartFile file) {
        try {
            if(file != null) {
                try {
                    String dir = new File(stringForPathURI).getAbsolutePath();
                    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                    String extension = FilenameUtils.getExtension(fileName);

                    if (!Stream.of(AvailableExtensions.values()).anyMatch(v -> v.name().toLowerCase().equals(extension.toLowerCase()))) {
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
            return new ResponseEntity("Nie udało się dodać zdjęcia.",
                    HttpStatus.BAD_REQUEST
            );
        }
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    public List<CharactersMenuDTO> findCharList() {
        List<Character> allCharactersFromDb = characterRepository.getNonArchivedCharacters();
        ModelMapper modelMapper = new ModelMapper();
        List<CharactersMenuDTO> dtoList = new ArrayList<>();

        for(Character characterFromDb : allCharactersFromDb) {
            CharactersMenuDTO dto = modelMapper.map(characterFromDb, CharactersMenuDTO.class);
            getPicForMenu(characterFromDb, dto);
                dtoList.add(dto);
}
        return dtoList;
    }

    public ResponseEntity findByExternalId(Long externalId) {
        ModelMapper modelMapper = new ModelMapper();
        Character oneCharacter = characterRepository.getNonArchivedCharacter(externalId);
        if(oneCharacter == null) {
            String err = "Nie udało się znaleźć postaci.";
            return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
        }

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

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    public List<EveryCharacterMenuDTO> getEveryCharacter() {
        ModelMapper modelMapper = new ModelMapper();
        List<Character> charactersFromDb = characterRepository.findAll(Sort.by(Sort.Direction.ASC, "externalId"));
        List<EveryCharacterMenuDTO> dtoList = new ArrayList<>();
        for (Character character : charactersFromDb) {
            EveryCharacterMenuDTO dto = modelMapper.map(character, EveryCharacterMenuDTO.class);
            dtoList.add(dto);
            getPicForMenu(character, dto);
        }
        return dtoList;
    }

    public ResponseEntity changeStatusForCharacter(ChangeCharacterStateRequest character) {
            Character charToChange = characterRepository.getOne(character.getId());
            if(charToChange == null) {
                return new ResponseEntity<>("Nie można zmienić stanu postaci o nieistniejącym id.",
                        HttpStatus.BAD_REQUEST);
            }
            charToChange.setArchived(character.getArchived());
            characterRepository.save(charToChange);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    public List<TitleDTO> getTitles() {
        ModelMapper modelMapper = new ModelMapper();
        List<Titles> titlesFromDb = titlesRepository.findAll(Sort.by(Sort.Direction.ASC, "sequence"));
        List<TitleDTO> result = new ArrayList<>();

        titlesFromDb.forEach(title -> {
            TitleDTO titleMapped = modelMapper.map(title, TitleDTO.class);
            result.add(titleMapped);
        });
        return result;
    }

    public ResponseEntity createStoryForCharacter(CreateStoryForCharRequest request) {
        String msg = "";
        Story storyToCreate = new Story();
        Boolean emptyTitle = false;
        Boolean emptyStory = false;
        Boolean noTitle = false;

        Character characterFromId = characterRepository.getOne(request.getCharacterId());

        for (StoryRequest story: request.getStories()) {
            if(story.getTitleId() == null) {
                emptyTitle = true;
            } else if(story.getStory() == null || story.getStory().length() == 0){
                emptyStory = true;
            }
            Titles titleFromId = titlesRepository.getOne(story.getTitleId());
            if(titleFromId == null) {
                noTitle = true;
            }
            storyToCreate.setStory(story.getStory());
            storyToCreate.setTitle(titleFromId);
        }
        if(characterFromId == null) {
            msg += "Brak postaci o podanym id. ";
        } else if (request.getCharacterId() == null) {
            msg += "Nie wybrano postaci. ";
        } else if(request.stories == null || emptyStory){
            msg += "Brak historii do dodania. ";
        } else if(emptyTitle) {
            msg += "Nie sprecyzowano tytułu. ";
        } else if(noTitle) {
            msg += "Brak tytułu o podanym id. ";
        }
        if(msg.length() > 0) {
            return new ResponseEntity(msg, HttpStatus.BAD_REQUEST);
        }

        storyToCreate.setCharacter(characterFromId);
        storyRepository.saveAndFlush(storyToCreate);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity createCharacter(MultipartHttpServletRequest multipartHttpServletRequest) {
        String name = multipartHttpServletRequest.getParameter("name");
        String surname = multipartHttpServletRequest.getParameter("surname");
        String birthday = multipartHttpServletRequest.getParameter("birthday");
        String profession = multipartHttpServletRequest.getParameter("profession");
        String death = multipartHttpServletRequest.getParameter("death");
        String deathReason = multipartHttpServletRequest.getParameter("deathReason");

        Integer melancholic = Integer.parseInt(multipartHttpServletRequest.getParameter("melancholic"));
        Integer sanguine = Integer.parseInt(multipartHttpServletRequest.getParameter("sanguine"));
        Integer flegmatic = Integer.parseInt(multipartHttpServletRequest.getParameter("flegmatic"));
        Integer choleric = Integer.parseInt(multipartHttpServletRequest.getParameter("choleric"));

        String themeColor1 = multipartHttpServletRequest.getParameter("themeColor1");
        String themeColor2 = multipartHttpServletRequest.getParameter("themeColor2");
        String themeColor3 = multipartHttpServletRequest.getParameter("themeColor3");
        String eyeColor1 = multipartHttpServletRequest.getParameter("eyeColor1");
        String eyeColor2 = multipartHttpServletRequest.getParameter("eyeColor2");
        String hairColor = multipartHttpServletRequest.getParameter("hairColor");
        String skinColor = multipartHttpServletRequest.getParameter("skinColor");

        Integer babyWeight = Integer.parseInt(multipartHttpServletRequest.getParameter("babyWeight"));
        Integer childWeight = Integer.parseInt(multipartHttpServletRequest.getParameter("childWeight"));
        Integer teenWeight = Integer.parseInt(multipartHttpServletRequest.getParameter("teenWeight"));
        Integer adultWeight = Integer.parseInt(multipartHttpServletRequest.getParameter("adultWeight"));
        Integer babyHeight = Integer.parseInt(multipartHttpServletRequest.getParameter("babyHeight"));
        Integer childHeight = Integer.parseInt(multipartHttpServletRequest.getParameter("childHeight"));
        Integer teenHeight = Integer.parseInt(multipartHttpServletRequest.getParameter("teenHeight"));
        Integer adultHeight = Integer.parseInt(multipartHttpServletRequest.getParameter("adultHeight"));


        Date birthdayDate = new Date(Long.parseLong(birthday));
        Long parsedBirthdayDate = birthdayDate.getTime() / 1000;


        Character character = new Character(name, surname, parsedBirthdayDate, profession);
        try {
        Date deathDate = new Date(Long.parseLong(death));
        Long parsedDeathDate = deathDate.getTime() / 1000;
        character.setDeath(parsedDeathDate);
        character.setDeathReason(deathReason);
        } catch (NumberFormatException n) {
        }

        Temperament temperamentForCharacter = new Temperament(melancholic, sanguine, flegmatic, choleric, character);
        Colors colorsForCharacter = new Colors(themeColor1, themeColor2, themeColor3, eyeColor1, eyeColor2, hairColor, skinColor, character);
        Measurements measurementsForCharacter = new Measurements(babyHeight, babyWeight, childHeight, childWeight, teenHeight,
                 teenWeight, adultHeight, adultWeight, character);

        characterRepository.saveAndFlush(character);
        temperamentRepository.saveAndFlush(temperamentForCharacter);
        colorsRepository.saveAndFlush(colorsForCharacter);
        measurementsRepository.saveAndFlush(measurementsForCharacter);

        String stringForPathURI = String.format("src\\main\\resources\\static\\character-profile-pics\\%s",
                character.getExternalId(), character);

        Boolean isProfilePic = multipartHttpServletRequest.getFileMap().containsKey("profilePic");
        MultipartFile profilePic = multipartHttpServletRequest.getFile("profilePic");
        if(isProfilePic) {
            setPicForMenu(stringForPathURI, profilePic);
        }

//        Iterator<String> iterator = multipartHttpServletRequest.getFileNames();
//        MultipartFile multipartFile;
//
//        while (iterator.hasNext()) {
//            String value = iterator.next();
//            if (value == "profilePic") {
//                continue;
//            }
//            multipartFile = multipartHttpServletRequest.getFile(iterator.next());
//            System.out.println(multipartFile);
//        }
        Map<String, MultipartFile> allFiles = multipartHttpServletRequest.getFileMap();
        Iterator it = allFiles.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry)it.next();
            if (pair.getKey() == "profilePic") {
                continue;
            }
            System.out.println(pair.getKey() + " = " + pair.getValue());
            it.remove();
        }


        return new ResponseEntity(HttpStatus.CREATED);
    }
}
