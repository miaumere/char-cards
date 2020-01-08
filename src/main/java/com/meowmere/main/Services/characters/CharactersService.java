package com.meowmere.main.Services.characters;


import com.meowmere.main.DTO.character.character.CharacterDTO;
import com.meowmere.main.DTO.character.character.CharacterDetailsDTO;
import com.meowmere.main.DTO.character.character.CharactersMenuDTO;
import com.meowmere.main.DTO.character.character.EveryCharacterMenuDTO;
import com.meowmere.main.DTO.character.colors.CharacterColorDTO;
import com.meowmere.main.DTO.character.measurements.CharacterMeasurementsDTO;
import com.meowmere.main.DTO.character.quote.CharacterQuoteDTO;
import com.meowmere.main.DTO.character.quote.QuoteForListDTO;
import com.meowmere.main.DTO.character.story.CharacterStoryDTO;
import com.meowmere.main.DTO.character.story.StoryForListDTO;
import com.meowmere.main.DTO.character.temperament.CharacterTemperamentDTO;
import com.meowmere.main.DTO.character.titles.TitleDTO;
import com.meowmere.main.Entities.characters.Character;
import com.meowmere.main.Entities.characters.*;
import com.meowmere.main.Enums.AvailableExtensions;
import com.meowmere.main.Repositories.character.*;
import com.meowmere.main.Requests.characters.character.ChangeCharacterStateRequest;
import com.meowmere.main.Requests.characters.character.EditCharacterRequest;
import com.meowmere.main.Requests.characters.quotes.EditQuoteRequest;
import com.meowmere.main.Requests.characters.quotes.NewQuoteForCharacterRequest;
import com.meowmere.main.Requests.characters.stories.CreateStoryForCharRequest;
import com.meowmere.main.Requests.characters.titles.EditTitleRequest;
import com.meowmere.main.Requests.characters.titles.NewTitleRequest;
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
    private ResponseEntity setPic(String stringForPathURI, MultipartFile file) {
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
            String err = "Nie udało się znaleźć postaci o podanym id.";
            return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
        }

        CharacterDTO dto = modelMapper.map(oneCharacter, CharacterDTO.class);

        List<Story> storiesFromDb = storyRepository.getAllStoriesForCharacter(externalId);
        List<CharacterStoryDTO> stories = new ArrayList<>();
        if(storiesFromDb != null && storiesFromDb.size() > 0){
            for (Story storyFromDb : storiesFromDb) {
                stories.add(modelMapper.map(storyFromDb, CharacterStoryDTO.class));
            }
        }
        dto.setStory(stories);

        Colors colorsForCharacter = colorsRepository.getColorsForCharacter(externalId);
        if (colorsForCharacter != null) {
            dto.setColors(modelMapper.map(colorsForCharacter, CharacterColorDTO.class));
        }

        Temperament temperamentForCharacter = temperamentRepository.getTemperamentForCharacter(externalId);
        if(temperamentForCharacter != null) {
            dto.setTemperament(modelMapper.map(temperamentForCharacter, CharacterTemperamentDTO.class));
        }

        Measurements measurementsForCharacter = measurementsRepository.getMeasurementsById(externalId);
        if(measurementsForCharacter != null){
            dto.setMeasurements(modelMapper.map(measurementsForCharacter, CharacterMeasurementsDTO.class));
        }

        List<Quote> quotes = quoteRepository.getAllQuotesByCharacterId(externalId);
        Random random = new Random();
        if(quotes.size() > 1){
            Quote randomQuote = quotes.get(random.nextInt(quotes.size()));
            dto.setQuote(modelMapper.map(randomQuote, CharacterQuoteDTO.class));
        } else if(quotes.size() == 1) {
            dto.setQuote(modelMapper.map(quoteRepository.getOne(externalId), CharacterQuoteDTO.class));
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

    public ResponseEntity setTitlesSequence(List<TitleDTO> titles) {
        for (int i = 0; i < titles.size(); i++) {
            Titles title = titlesRepository.getOne(titles.get(i).getId());
            if(title == null){
                continue;
            }
            title.setSequence(new Long(i));
            titlesRepository.saveAndFlush(title);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity newTitle(NewTitleRequest request) {
        Titles title = new Titles();
        Long titlesLength = new Long(titlesRepository.findAll().size());
        title.setTitle(request.getTitle());
        title.setSequence(titlesLength + 1);
        titlesRepository.saveAndFlush(title);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity getStoriesForCharacter(Long id) {
        List<Titles> titlesFromDb = titlesRepository.findAll();
        List<Story> storiesFromDb = storyRepository.getAllStoriesForCharacter(id);
        List<StoryForListDTO> stories = new ArrayList<>();

        for (Titles titleFromDb : titlesFromDb) {
            StoryForListDTO dto = new StoryForListDTO();
            TitleDTO title = new TitleDTO();
            title.setId(titleFromDb.getId());
            title.setTitle(titleFromDb.getTitle());
            dto.setTitle(title);
            Story storyForChar = storyRepository.getStoryForCharacterAndTitle(id, titleFromDb.getId());
            if(storyForChar != null) {
                String storyToSet = storyForChar.getStory();
                dto.setStory(storyToSet);
            }
            stories.add(dto);
        }
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    public ResponseEntity createStoryForCharacter(CreateStoryForCharRequest request) {
        String msg = "";
        Story storyToCreate = new Story();
        Boolean emptyTitle = false;
        Boolean emptyStory = false;
        Boolean noTitle = false;

        Character characterFromId = characterRepository.getOne(request.getCharacterId());

        if(request.getStory() != null) {

            Titles titleFromId = titlesRepository.getOne(request.getTitleId());
            if(titleFromId == null) {
                noTitle = true;
            }
            storyToCreate.setStory(request.getStory());
            storyToCreate.setTitle(titleFromId);
        } else {
            emptyStory = true;
        }
        if(characterFromId == null) {
            msg += "Brak postaci o podanym id. ";
        } else if (request.getCharacterId() == null) {
            msg += "Nie wybrano postaci. ";
        } else if(request.story == null || emptyStory){
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
            setPic(stringForPathURI, profilePic);
        }

        String stringForCharactersURI = String.format("src\\main\\resources\\static\\characters-images\\%s",
                character.getExternalId(), character);

        Map<String, MultipartFile> allFiles = multipartHttpServletRequest.getFileMap();
        Iterator it = allFiles.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry)it.next();
            if (pair.getKey() == "profilePic") {
                continue;
            }
            MultipartFile file = (MultipartFile) pair.getValue();
            setPic(stringForCharactersURI, file);
            it.remove();
        }
        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity editCharacter(EditCharacterRequest request) {

        String test = "xxxx";
        Character character = characterRepository.getOne(request.getExternalId());

        if(character == null) {
            String msg = "Postać o podanym id nie istnieje.";
            return new ResponseEntity(msg, HttpStatus.BAD_REQUEST);
        }

        character.setCharName(request.getCharName());
        character.setCharSurname(request.getCharSurname());
        character.setBirthday(request.getBirthday());
        character.setOccupation(request.getOccupation());
        character.setDeath(request.getDeath());
        character.setDeathReason(request.getDeathReason());

        characterRepository.saveAndFlush(character);

        Colors colors = colorsRepository.getColorsForCharacter(request.getExternalId());
                colors.setThemeColor1(request.getColors().getThemeColor1());
                colors.setThemeColor2(request.getColors().getThemeColor2());
                colors.setThemeColor3(request.getColors().getThemeColor3());
                colors.setEyeColor1(request.getColors().getEyeColor1());
                colors.setEyeColor2(request.getColors().getEyeColor2());
                colors.setHairColor(request.getColors().getHairColor());
                colors.setSkinColor(request.getColors().getSkinColor());

        colorsRepository.saveAndFlush(colors);

        Temperament temperament = temperamentRepository.getTemperamentForCharacter(request.getExternalId());
        temperament.setMelancholic(request.getTemperament().getMelancholic());
        temperament.setCholeric(request.getTemperament().getCholeric());
        temperament.setFlegmatic(request.getTemperament().getFlegmatic());
        temperament.setSanguine(request.getTemperament().getSanguine());

        temperamentRepository.saveAndFlush(temperament);

        Measurements measurements = measurementsRepository.getMeasurementsById(request.getExternalId());
        measurements.setBabyHeight(request.getMeasurements().getBabyHeight());
        measurements.setBabyWeight(request.getMeasurements().getBabyWeight());
        measurements.setChildHeight(request.getMeasurements().getChildHeight());
        measurements.setChildWeight(request.getMeasurements().getChildHeight());
        measurements.setTeenHeight(request.getMeasurements().getTeenHeight());
        measurements.setTeenWeight(request.getMeasurements().getTeenWeight());
        measurements.setAdultHeight(request.getMeasurements().getAdultHeight());
        measurements.setAdultWeight(request.getMeasurements().getAdultWeight());

        measurementsRepository.saveAndFlush(measurements);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity getCharacterDetails(Long id) {
        ModelMapper modelMapper = new ModelMapper();
        Character characterFromDb = characterRepository.getOne(id);
        if(characterFromDb == null) {
            String msg = "Nie znaleziono postaci o podanym id.";
            return new ResponseEntity(msg, HttpStatus.BAD_REQUEST);
        }
        CharacterDetailsDTO dto = modelMapper.map(characterFromDb, CharacterDetailsDTO.class);
        Colors colorsForCharacter = colorsRepository.getColorsForCharacter(id);
        if (colorsForCharacter != null) {
            dto.setColors(modelMapper.map(colorsForCharacter, CharacterColorDTO.class));
        }

        Temperament temperamentForCharacter = temperamentRepository.getTemperamentForCharacter(id);
        if(temperamentForCharacter != null) {
            dto.setTemperament(modelMapper.map(temperamentForCharacter, CharacterTemperamentDTO.class));
        }

        Measurements measurementsForCharacter = measurementsRepository.getMeasurementsById(id);
        if(measurementsForCharacter != null){
            dto.setMeasurements(modelMapper.map(measurementsForCharacter, CharacterMeasurementsDTO.class));
        }
        return new ResponseEntity(dto, HttpStatus.OK);
    }

    public ResponseEntity getAllQuotesForCharacter(Long id) {
        ModelMapper modelMapper = new ModelMapper();
        List<QuoteForListDTO> result = new ArrayList<>();

        List<Quote> quotesFromDb = quoteRepository.getAllQuotesByCharacterId(id);
        if(quotesFromDb != null){
            for (Quote quoteFromDb: quotesFromDb) {
                QuoteForListDTO dto = modelMapper.map(quoteFromDb, QuoteForListDTO.class);
                result.add(dto);
            }
        }
        return new ResponseEntity(result, HttpStatus.OK);
    }

    public ResponseEntity createQuoteForCharacter(NewQuoteForCharacterRequest request){
        Quote quote = new Quote();
        quote.setQuote(request.getQuote());
        quote.setContext(request.getContext());

        Character character = characterRepository.getOne(request.getCharacterId());
        if(character == null) {
            String msg = "Nie znaleziono postaci o podanym id.";
            return new ResponseEntity(msg, HttpStatus.BAD_REQUEST);
        }

        List<Quote> quotesForChar = new ArrayList<>();
        quotesForChar.add(quote);
        character.setQuotes(quotesForChar);
        quote.setCharacter(character);
        quoteRepository.saveAndFlush(quote);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity deleteQuote(Long id) {
        Quote quoteToDelete = quoteRepository.getOne(id);
        if(quoteToDelete == null) {
            String msg = "Nie ma takiego cytatu bądź został już wcześniej usunięty.";
            return new ResponseEntity(msg, HttpStatus.BAD_REQUEST);
        }
        quoteRepository.delete(quoteToDelete);
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity deleteTitle(Long id) {
        Titles titleToDelete = titlesRepository.getOne(id);
        if (titleToDelete == null) {
            String msg = "Nie ma takiego tytułu bądź został już wcześniej usunięty";
            return new ResponseEntity(msg, HttpStatus.BAD_REQUEST);
        }
        titlesRepository.delete(titleToDelete);
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity editQuote(EditQuoteRequest request) {
        Quote quote = quoteRepository.getOne(request.getQuoteId());
        if(quote == null) {
            String msg = "Nie znaleziono cytatu.";
            return new ResponseEntity(msg, HttpStatus.BAD_REQUEST);
        }
        quote.setQuote(request.getQuote());
        quote.setContext(request.getContext());
        quoteRepository.saveAndFlush(quote);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity editTitle(EditTitleRequest request) {
        Titles title = titlesRepository.getOne(request.getId());
        if(title == null) {
            String msg = "Nie znaleziono tytułu.";
            return new ResponseEntity(msg, HttpStatus.BAD_REQUEST);
        }
        title.setTitle(request.getTitle());
        titlesRepository.saveAndFlush(title);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
