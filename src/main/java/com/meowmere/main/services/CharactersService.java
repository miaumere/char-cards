package com.meowmere.main.services;


import com.meowmere.main.dto.character.character.CharacterDTO;
import com.meowmere.main.dto.character.character.CharacterDetailsDTO;
import com.meowmere.main.dto.character.character.CharactersMenuDTO;
import com.meowmere.main.dto.character.character.EveryCharacterMenuDTO;
import com.meowmere.main.dto.character.colors.CharacterColorDTO;
import com.meowmere.main.dto.character.image.ImageDTO;
import com.meowmere.main.dto.character.image.ProfilePicForMainDTO;
import com.meowmere.main.dto.character.measurements.CharacterMeasurementsDTO;
import com.meowmere.main.dto.character.quote.CharacterQuoteDTO;
import com.meowmere.main.dto.character.quote.QuoteForListDTO;
import com.meowmere.main.dto.character.relationship.RelatedCharacterDTO;
import com.meowmere.main.dto.character.relationship.RelationshipDTO;
import com.meowmere.main.dto.character.relationship.RelationshipsForCharacterDTO;
import com.meowmere.main.dto.character.story.CharacterStoryDTO;
import com.meowmere.main.dto.character.temperament.CharacterTemperamentDTO;
import com.meowmere.main.entities.characters.Character;
import com.meowmere.main.entities.characters.*;
import com.meowmere.main.enums.AvailableExtensions;
import com.meowmere.main.enums.CharType;
import com.meowmere.main.enums.Gender;
import com.meowmere.main.enums.RelationshipType;
import com.meowmere.main.repositories.character.*;
import com.meowmere.main.requests.characters.character.ChangeCharacterStateRequest;
import com.meowmere.main.requests.characters.character.CreateCharacterRequest;
import com.meowmere.main.requests.characters.character.EditCharacterRequest;
import com.meowmere.main.requests.characters.image.ImageRenameRequest;
import com.meowmere.main.requests.characters.quotes.EditQuoteRequest;
import com.meowmere.main.requests.characters.quotes.NewQuoteForCharacterRequest;
import com.meowmere.main.requests.characters.relationship.EditRelationshipRequest;
import com.meowmere.main.requests.characters.relationship.RelationRequest;
import com.meowmere.main.requests.characters.stories.CreateStoryForCharRequest;
import com.meowmere.main.requests.characters.stories.EditStoryRequest;
import org.apache.commons.io.FilenameUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

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
    public ImageRepository imageRepository;
    @Autowired
    public RelationshipRepository relationshipRepository;
    @Autowired
    public CharacterStoryRepository characterStoryRepository;

    public ResponseEntity findCharList() {
        List<Character> allCharactersFromDb = characterRepository.getNonArchivedCharacters();
        ModelMapper modelMapper = new ModelMapper();
        ArrayList<CharactersMenuDTO> dtoList = new ArrayList<>();

        for(Character characterFromDb : allCharactersFromDb) {
            CharactersMenuDTO dto = modelMapper.map(characterFromDb, CharactersMenuDTO.class);
            ProfilePicForMainDTO profilePic = new ProfilePicForMainDTO();
            Image image = imageRepository.getProfilePicForCharacter(characterFromDb.getExternalId());
            if(image != null){
                profilePic.setExtension(image.getExtension());
                profilePic.setImage(image.getImage());
                dto.setProfilePic(profilePic);
            }
            dto.setCharacterType(characterFromDb.getCharType().name());
            dtoList.add(dto);
        }
        return new ResponseEntity(dtoList, HttpStatus.OK);
    }

    public ResponseEntity getCharacter(Long externalId) {
        ModelMapper modelMapper = new ModelMapper();
        Character oneCharacter = characterRepository.getNonArchivedCharacter(externalId);
        if(oneCharacter == null) {
            String err = "Nie udało się znaleźć postaci o podanym id.";
            return new ResponseEntity<>(err, HttpStatus.NOT_FOUND);
        }

        CharacterDTO dto = modelMapper.map(oneCharacter, CharacterDTO.class);

        dto.setCharType(oneCharacter.getCharType().name());
        if(oneCharacter.getGender() != null) {
            dto.setGender(oneCharacter.getGender().name());
        }

        List<CharacterStory> storiesForCharacter = characterStoryRepository.getStoriesForCharacter(externalId);
        ArrayList<CharacterStoryDTO> stories = new ArrayList<>();
        if(storiesForCharacter != null && storiesForCharacter.size() > 0){
            for(CharacterStory story : storiesForCharacter) {
                stories.add(modelMapper.map(story, CharacterStoryDTO.class));
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

        List<Relationship> relationshipsForCharacter = relationshipRepository.getRelationshipsForCharacter(externalId);
        List<RelationshipDTO> relationshipDTOS =  new ArrayList<>();

        if (relationshipsForCharacter != null) {
            for (Relationship relationship : relationshipsForCharacter) {
                RelationshipDTO relationshipDTO = new RelationshipDTO();
                RelatedCharacterDTO relatedCharacterDTO = new RelatedCharacterDTO();
                Character character = relationship.getRelatedCharacter();

                relatedCharacterDTO.setId(character.getExternalId());
                relatedCharacterDTO.setCharName(character.getCharName());
                relatedCharacterDTO.setCharSurname(character.getCharSurname());

                Image profilePicForCharacter = imageRepository.getProfilePicForCharacter(character.getExternalId());
                ProfilePicForMainDTO profilePicForMainDTO = new ProfilePicForMainDTO();
                profilePicForMainDTO.setExtension(profilePicForCharacter.getExtension());
                profilePicForMainDTO.setImage(profilePicForCharacter.getImage());

                relatedCharacterDTO.setProfilePic(profilePicForMainDTO);
                relationshipDTO.setRelatedCharacter(relatedCharacterDTO);
                relationshipDTO.setRelationName(relationship.getRelationName().name());
                relationshipDTOS.add(relationshipDTO);
            }
        }
        dto.setRelationships(relationshipDTOS);

        List<Quote> quotes = quoteRepository.getAllQuotesByCharacterId(externalId);
        Random random = new Random();
        if(quotes.size() > 1){
            Quote randomQuote = quotes.get(random.nextInt(quotes.size()));
            dto.setQuote(modelMapper.map(randomQuote, CharacterQuoteDTO.class));
        } else if(quotes.size() == 1) {
            dto.setQuote(modelMapper.map(quotes.get(0), CharacterQuoteDTO.class));
        }

        ArrayList<ImageDTO> imagesList = new ArrayList<>();
        List<Image> imagesFromDb = imageRepository.getImagesForCharacter(externalId);

        if(imagesFromDb != null) {
            for (Image images : imagesFromDb) {
                imagesList.add(modelMapper.map(images, ImageDTO.class));
            }
        }
        dto.setImagesList(imagesList);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    public ResponseEntity getEveryCharacter() {
        ModelMapper modelMapper = new ModelMapper();
        List<Character> charactersFromDb =
                characterRepository.findAll(Sort.by(Sort.Direction.ASC, "charName"));
        ArrayList<EveryCharacterMenuDTO> dtoList = new ArrayList<>();
        for (Character character : charactersFromDb) {
            EveryCharacterMenuDTO dto = modelMapper.map(character, EveryCharacterMenuDTO.class);

            ProfilePicForMainDTO profilePic = new ProfilePicForMainDTO();
            Image image = imageRepository.getProfilePicForCharacter(character.getExternalId());
            if(image != null){
                profilePic.setExtension(image.getExtension());
                profilePic.setImage(image.getImage());
                dto.setProfilePic(profilePic);
            }
            dtoList.add(dto);
        }
        return new ResponseEntity(dtoList, HttpStatus.OK);
    }

    public ResponseEntity changeStatusForCharacter(ChangeCharacterStateRequest character) {
            Character charToChange = characterRepository.getOne(character.getId());
            if(charToChange == null) {
                return new ResponseEntity<>("Nie można zmienić stanu postaci o nieistniejącym id.",
                        HttpStatus.NOT_FOUND);
            }
            charToChange.setArchived(character.getArchived());
            characterRepository.save(charToChange);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity newImages(MultipartHttpServletRequest multipartHttpServletRequest, Long id) {
        Map<String, MultipartFile> allFiles = multipartHttpServletRequest.getFileMap();
        Character character = characterRepository.getOne(id);
        if(character == null) {
            String msg = "Nie znaleziono postaci o podanym id.";
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
        }
        Iterator it = allFiles.entrySet().iterator();
        while (it.hasNext()) {
            Image imageToSave = new Image();
            Map.Entry pair = (Map.Entry)it.next();
            String key = String.valueOf(pair.getKey());
            imageToSave.setIsProfilePic(!!key.equals("profilePic"));
            MultipartFile file = (MultipartFile) pair.getValue();

            if(file != null) {
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                String extension = FilenameUtils.getExtension(fileName);

                if (!Stream.of(AvailableExtensions.values()).anyMatch(v -> v.name().toLowerCase().equals(extension.toLowerCase()))) {
                    return new ResponseEntity(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
                }
                try {
                    if(imageToSave.getIsProfilePic()) {
                        Image oldProfilePic = imageRepository.getProfilePicForCharacter(character.getExternalId());
                        if(oldProfilePic != null) {
                        imageRepository.delete(oldProfilePic);
                        }
                    }


                    byte [] byteArr = file.getBytes();
                    imageToSave.setImage(byteArr);
                    imageToSave.setName(FilenameUtils.removeExtension(file.getOriginalFilename()));
                    imageToSave.setExtension(extension);
                    imageToSave.setCharacter(character);

                    imageRepository.saveAndFlush(imageToSave);

                } catch (IOException e) {}

                it.remove();
            }}
        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity changeImageName(ImageRenameRequest request) {
        Image image = imageRepository.getOne(request.getId());
        if(image == null) {
            String msg = "Brak obrazka o podanym id.";
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
        }
        image.setName(request.getName());
        imageRepository.saveAndFlush(image);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity createCharacter(CreateCharacterRequest request) {
        Character character = new Character();
        if(request.getBirthday() != null) {
            Date birthdayDate = new Date(request.getBirthday());
            Long parsedBirthdayDate = birthdayDate.getTime() / 1000;
            character.setBirthday(parsedBirthdayDate);
        }
        character.setPseudonim(request.getPseudonim());
        character.setCharName(request.getCharName());
        character.setCharSurname(request.getCharSurname());
        character.setOccupation(request.getOccupation());
        character.setGender(Gender.valueOf(request.getGender()));
        character.setCharType(CharType.valueOf(request.getCharacterType()));
        character.setNationality(request.getNationality());

        if(request.getDeath() != null) {
            Date deathDate = new Date(request.getDeath());
            Long parsedDeathDate = deathDate.getTime() / 1000;
            character.setDeath(parsedDeathDate);
            character.setDeathReason(request.getDeathReason());
        }

        Temperament temperamentForCharacter = new Temperament(
                request.getTemperament().getMelancholic(),
                request.getTemperament().getSanguine(),
                request.getTemperament().getFlegmatic(),
                request.getTemperament().getCholeric(),
                character
        );
        Colors colorsForCharacter = new Colors(
                request.getColors().getThemeColor1(),
                request.getColors().getThemeColor2(),
                request.getColors().getThemeColor3(),
                request.getColors().getEyeColor1(),
                request.getColors().getEyeColor2(),
                request.getColors().getHairColor(),
                request.getColors().getSkinColor(),
                character);

        Measurements measurementsForCharacter = new Measurements(
                request.getMeasurements().getBabyHeight(),
                request.getMeasurements().getBabyWeight(),
                request.getMeasurements().getChildHeight(),
                request.getMeasurements().getChildWeight(),
                request.getMeasurements().getTeenHeight(),
                request.getMeasurements().getTeenWeight(),
                request.getMeasurements().getAdultHeight(),
                request.getMeasurements().getAdultWeight(),
                character);

        characterRepository.saveAndFlush(character);
        temperamentRepository.saveAndFlush(temperamentForCharacter);
        colorsRepository.saveAndFlush(colorsForCharacter);
        measurementsRepository.saveAndFlush(measurementsForCharacter);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity editCharacter(EditCharacterRequest request, boolean isDead) {
        Character character = characterRepository.getOne(request.getExternalId());

        if(character == null) {
            String msg = "Postać o podanym id nie istnieje.";
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
        }
        character.setPseudonim(request.getPseudonim());
        character.setCharName(request.getCharName());
        character.setCharSurname(request.getCharSurname());
        character.setGender(Gender.valueOf(request.getGender()));
        character.setCharType(CharType.valueOf(request.getCharacterType()));
        character.setNationality(request.getNationality());
        if(request.getBirthday() != null) {
            character.setBirthday(request.getBirthday());
        }
        character.setOccupation(request.getOccupation());

        if(isDead) {
            if(request.getDeath() != null){
                character.setDeath(request.getDeath());
                character.setDeathReason(request.getDeathReason());
            }
        } else {
            character.setDeath(null);
            character.setDeathReason(null);
        }

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
        measurements.setChildWeight(request.getMeasurements().getChildWeight());
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
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
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
        ArrayList<QuoteForListDTO> result = new ArrayList<>();

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
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
        }

        ArrayList<Quote> quotesForChar = new ArrayList<>();
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
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
        }
        quoteRepository.delete(quoteToDelete);
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity deleteImage(Long id) {
        Image imageToDelete = imageRepository.getOne(id);
        if (imageToDelete == null) {
            String msg = "Nie znaleziono obrazka.";
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
        }
        imageRepository.delete(imageToDelete);
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity editQuote(EditQuoteRequest request) {
        Quote quote = quoteRepository.getOne(request.getQuoteId());
        if(quote == null) {
            String msg = "Nie znaleziono cytatu.";
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
        }
        quote.setQuote(request.getQuote());
        quote.setContext(request.getContext());
        quoteRepository.saveAndFlush(quote);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity createRelationship(RelationRequest request) {
        Character characterOne = characterRepository.getOne(request.getCharId());
        Character characterTwo = characterRepository.getOne(request.getRelCharId());
        if (characterOne == null || characterTwo == null) {
            return new ResponseEntity("Co najmniej jedna z podanych postaci nie istnieje.", HttpStatus.BAD_REQUEST);
        }
        Relationship firstRelationship = new Relationship();
        firstRelationship.setCharacter(characterOne);
        firstRelationship.setRelatedCharacter(characterTwo);
        firstRelationship.setRelationName(request.getRelation());


        Relationship secondRelationship = new Relationship();
        secondRelationship.setCharacter(characterTwo);
        secondRelationship.setRelatedCharacter(characterOne);
        secondRelationship.setRelationName(request.getReverseRelation());

        relationshipRepository.save(firstRelationship);
        relationshipRepository.save(secondRelationship);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity getRelationships(Long id) {
        List<Relationship> relationships = relationshipRepository.getRelationshipsForCharacter(id);

        List<RelationshipsForCharacterDTO> relationshipsForCharacterDTOList = new ArrayList<>();
        if(relationships != null) {
            relationships.forEach(relationship -> {
                RelationshipsForCharacterDTO relationshipsForCharacterDTO = new RelationshipsForCharacterDTO();
                RelationshipDTO relationshipDTO = new RelationshipDTO();
                relationshipDTO.setRelationName(relationship.getRelationName().name());
                Character character = relationship.getRelatedCharacter();

                RelatedCharacterDTO relatedCharacterDTO = new RelatedCharacterDTO();
                relatedCharacterDTO.setId(character.getExternalId());
                relatedCharacterDTO.setCharName(character.getCharName());
                relatedCharacterDTO.setCharSurname(character.getCharSurname());

                relationshipDTO.setRelatedCharacter(relatedCharacterDTO);

                Relationship reversedRelationship = relationshipRepository
                        .getRelationshipsWhereCharIsRelatedTo(id, relationship.getRelatedCharacter().getExternalId());

                if(reversedRelationship != null) {
                    relationshipsForCharacterDTO.setReverseRelationshipType(reversedRelationship.getRelationName().name());
                }

                relationshipsForCharacterDTO.setRelationship(relationshipDTO);
                relationshipsForCharacterDTOList.add(relationshipsForCharacterDTO);
            });
        }
        return new ResponseEntity(relationshipsForCharacterDTOList, HttpStatus.OK);
    }

    public ResponseEntity deleteRelationshipsForCharacters(Long characterId, Long relatedCharacterId) {
        Relationship relationship = relationshipRepository.getRelationshipsWhereCharIsRelatedTo(characterId, relatedCharacterId);
        Relationship reverseRelationship = relationshipRepository.getRelationshipsWhereCharIsRelatedTo(relatedCharacterId, characterId);
        if(relationship != null) {
            relationshipRepository.delete(relationship);
        }
        if (reverseRelationship != null) {
            relationshipRepository.delete(reverseRelationship);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity editRelationships(EditRelationshipRequest request) {

        Relationship relationship = relationshipRepository
                .getRelationshipsWhereCharIsRelatedTo(request.getCharacterId(), request.getRelatedCharacterId());

        Relationship reverseRelationship = relationshipRepository
                .getRelationshipsWhereCharIsRelatedTo(request.getRelatedCharacterId(), request.getCharacterId());
        if (request.getRelationType() != null){

            reverseRelationship.setRelationName(RelationshipType.valueOf(request.getRelationType()));
                relationshipRepository.saveAndFlush(reverseRelationship);

        }
        if(request.getReversedRelationType() != null) {
            if(relationship != null) {
                relationship.setRelationName(RelationshipType.valueOf(request.getReversedRelationType()));
                relationshipRepository.saveAndFlush(relationship);
            }
        }
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity getStoriesForCharacter(Long id) {
        ModelMapper modelMapper = new ModelMapper();
        List<CharacterStory> storiesForCharacter = characterStoryRepository.getStoriesForCharacter(id);
        ArrayList<CharacterStoryDTO> stories = new ArrayList<>();
        if(storiesForCharacter != null && storiesForCharacter.size() > 0){
            for(CharacterStory story : storiesForCharacter) {
                stories.add(modelMapper.map(story, CharacterStoryDTO.class));
            }
        }

        return new ResponseEntity(stories, HttpStatus.OK);
    }

    public ResponseEntity deleteStory(Long storyId) {
        CharacterStory characterStory = characterStoryRepository.getOne(storyId);
        if(characterStory == null) {
            return new ResponseEntity("Nie ma historii o takim id lub została wcześniej usunięta.", HttpStatus.NOT_FOUND);
        }
        characterStoryRepository.delete(characterStory);
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity editStoryIndexes(ArrayList<Long> storyIds, Long charId){
        List<CharacterStory> characterStories = characterStoryRepository.getStoriesForCharacter(charId);
        HashMap<Long, Integer> storyFromDatabase = new HashMap<>();

        for (int i = 0; i < characterStories.size(); i++) {
            CharacterStory characterStory =  characterStories.get(i);
            storyFromDatabase.put(characterStory.getId(), characterStory.getIndexOnList());
        }

        storyFromDatabase.forEach((key, value) -> {
            CharacterStory characterStory = characterStoryRepository.getOne(key);
                characterStory.setIndexOnList(99999 + value);
                characterStoryRepository.saveAndFlush(characterStory);
            }
        );

        for (int i = 0; i < storyIds.size(); i++) {
            CharacterStory characterStory = characterStoryRepository.getOne(storyIds.get(i));
            characterStory.setIndexOnList(i);
            characterStoryRepository.saveAndFlush(characterStory);

        }


        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity createStoryForCharacter(CreateStoryForCharRequest request) {
        Character character = characterRepository.getOne(request.getCharacterId());
        if(character == null) {
            return new ResponseEntity("Nie można utworzyć historii dla nieistniejącej postaci.", HttpStatus.NOT_FOUND);
        }
        CharacterStory characterStory = new CharacterStory();
        characterStory.setCharacter(character);
        characterStory.setStoryDesc(request.getDesc());
        characterStory.setTitle(request.getTitle());

        List<CharacterStory> characterStories = characterStoryRepository.getStoriesForCharacter(character.getExternalId());
        characterStory.setIndexOnList(characterStories.size()+1);

        characterStoryRepository.saveAndFlush(characterStory);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity editStory(EditStoryRequest request){
        CharacterStory characterStory = characterStoryRepository.getOne(request.getStoryId());
        if(characterStory == null) {
            return new ResponseEntity("Nie można edytować historii, która nie istnieje.", HttpStatus.NOT_FOUND);
        }
        characterStory.setTitle(request.getTitle());
        characterStory.setStoryDesc(request.getDesc());
        characterStoryRepository.saveAndFlush(characterStory);

        return new ResponseEntity(HttpStatus.OK);
    }
}