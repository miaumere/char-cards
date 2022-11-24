package com.meowmere.main.services;


import com.meowmere.main.dto.character.character.CharacterDTO;
import com.meowmere.main.dto.character.character.CharactersMenuDTO;
import com.meowmere.main.dto.character.colors.CharacterColorDTO;
import com.meowmere.main.dto.character.image.ImageDTO;
import com.meowmere.main.dto.character.measurements.CharacterMeasurementsDTO;
import com.meowmere.main.dto.character.measurements.MeasurementObj;
import com.meowmere.main.dto.character.preference.AllPreferencesDTO;
import com.meowmere.main.dto.character.preference.HistoricPreferenceDTO;
import com.meowmere.main.dto.character.quote.CharacterQuoteDTO;
import com.meowmere.main.dto.character.relation.*;
import com.meowmere.main.dto.character.starring.BookForCharacter;
import com.meowmere.main.dto.character.starring.ChapterForCharacter;
import com.meowmere.main.dto.character.story.CharacterStoryDTO;
import com.meowmere.main.dto.character.tags.TagDTO;
import com.meowmere.main.dto.character.temperament.CharacterTemperamentDTO;
import com.meowmere.main.entities.characters.Character;
import com.meowmere.main.entities.characters.*;
import com.meowmere.main.entities.characters.Image;
import com.meowmere.main.entities.story.Book;
import com.meowmere.main.entities.story.Chapter;
import com.meowmere.main.entities.story.StarringCharacters;
import com.meowmere.main.enums.*;
import com.meowmere.main.repositories.character.*;
import com.meowmere.main.repositories.story.BookRepository;
import com.meowmere.main.repositories.story.ChapterRepository;
import com.meowmere.main.repositories.story.StarringCharactersRepository;
import com.meowmere.main.requests.characters.character.ChangeCharacterStateRequest;
import com.meowmere.main.requests.characters.character.EditCharacterRequest;
import com.meowmere.main.requests.characters.image.ImageRenameRequest;
import com.meowmere.main.requests.characters.preference.PreferenceRequest;
import com.meowmere.main.requests.characters.quotes.UpsertQuoteRequest;
import com.meowmere.main.requests.characters.stories.StoryRequest;
import com.meowmere.main.utils.UtilsShared;
import lombok.var;
import org.apache.commons.io.FilenameUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import lombok.val;


import javax.servlet.http.HttpServletRequest;

import static java.util.Comparator.comparing;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;
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
    public RelationRepository relationsRepository;
    @Autowired
    public CharacterStoryRepository characterStoryRepository;
    @Autowired
    public PreferenceRepository preferenceRepository;
    @Autowired
    public StarringCharactersRepository starringCharactersRepository;
    @Autowired
    public ChapterRepository chapterRepository;
    @Autowired
    public BookRepository bookRepository;
    @Autowired
    public RelationCoordinatesRepository relationCoordinatesRepository;
    @Autowired
    private UserService userService;
    @Autowired
    public TagRepository tagRepository;
    @Autowired
    public CharacterTagRepository characterTagRepository;

    public ResponseEntity getEveryCharacter(HttpServletRequest request) {
        Boolean isUserLogged = userService.isUserLogged(request);
        val allCharactersFromDb = isUserLogged ? characterRepository.getSortedCharacters() : characterRepository.getNonArchivedCharacters();
        allCharactersFromDb.sort(comparing(Character::getCharType)
                .thenComparing(Character::getArchived)
                .thenComparing(Character::getCharName));

        val dtoList = new ArrayList<>();

        for (val characterFromDb : allCharactersFromDb) {
            var image = imageRepository.getProfilePicForCharacter(characterFromDb.getExternalId());
            var profilePic = image != null ? UtilsShared.GetProfilePicBase64Code(image.getExtension(), image.getImage()) : null;

            CharactersMenuDTO dto = new CharactersMenuDTO(characterFromDb, profilePic);

            List<TagDTO> tagDTOS = new ArrayList<>();
            val tags = tagRepository.getTagsForCharacter(characterFromDb.getExternalId());
            if (tags != null) {
                tags.forEach(tag -> tagDTOS.add(new TagDTO(tag.getId(), tag.getName(), tag.getColor())));
            }
            dto.setTags(tagDTOS);
            dtoList.add(dto);
        }
        return new ResponseEntity(dtoList, HttpStatus.OK);
    }

    private double calcBmi(Integer height, Integer weight) {
        if (height == null || weight == null) {
            return 0;
        }

        double bmi = (float) weight / (float) Math.pow((float) height / 100, 2);
        
        return (double) Math.ceil(bmi * 100) / 100;
    }

    public ResponseEntity getCharacter(Long externalId) {
        ModelMapper modelMapper = new ModelMapper();
        Character oneCharacter = characterRepository.getOne(externalId);
        if (oneCharacter == null) {
            String err = "Nie udało się znaleźć postaci o podanym id.";
            return new ResponseEntity(err, HttpStatus.NOT_FOUND);
        }

        CharacterDTO dto = modelMapper.map(oneCharacter, CharacterDTO.class);

        dto.setCharType(oneCharacter.getCharType().name());
        if (oneCharacter.getGender() != null) {
            dto.setGender(oneCharacter.getGender().name());
        }

        val storiesForCharacter = characterStoryRepository.getStoriesForCharacter(externalId);
        ArrayList<CharacterStoryDTO> stories = new ArrayList<>();
        if (storiesForCharacter != null && storiesForCharacter.size() > 0) {
            for (CharacterStory story : storiesForCharacter) {
                stories.add(modelMapper.map(story, CharacterStoryDTO.class));
            }
        }
        dto.setStory(stories);

        val colorsForCharacter = colorsRepository.getColorsForCharacter(externalId);
        if (colorsForCharacter != null) {
            dto.setColors(modelMapper.map(colorsForCharacter, CharacterColorDTO.class));
        }

        val temperamentForCharacter = temperamentRepository.getTemperamentForCharacter(externalId);
        if (temperamentForCharacter != null) {
            dto.setTemperament(modelMapper.map(temperamentForCharacter, CharacterTemperamentDTO.class));
        }

        val measurementsForCharacter = measurementsRepository.getMeasurementsById(externalId);
        Map<String, MeasurementObj> measurements = new HashMap<>();

        if (measurementsForCharacter != null) {

            measurements.put("baby", new MeasurementObj(
                    measurementsForCharacter.getBabyHeight(),
                    measurementsForCharacter.getBabyWeight(),
                    calcBmi(measurementsForCharacter.getBabyHeight(),
                            measurementsForCharacter.getBabyWeight())
            ));
            measurements.put("child", new MeasurementObj(
                    measurementsForCharacter.getChildHeight(),
                    measurementsForCharacter.getChildWeight(),
                    calcBmi(measurementsForCharacter.getChildHeight(),
                            measurementsForCharacter.getChildWeight())
            ));
            measurements.put("teen", new MeasurementObj(
                    measurementsForCharacter.getTeenHeight(),
                    measurementsForCharacter.getTeenWeight(),
                    calcBmi(measurementsForCharacter.getTeenHeight(),
                            measurementsForCharacter.getTeenWeight())
            ));
            measurements.put("adult", new MeasurementObj(
                    measurementsForCharacter.getAdultHeight(),
                    measurementsForCharacter.getAdultWeight(),
                    calcBmi(measurementsForCharacter.getAdultHeight(),
                            measurementsForCharacter.getAdultWeight())
            ));

            dto.setMeasurements(measurements);
        }


        List<Quote> quotes = quoteRepository.getAllQuotesByCharacterId(externalId);
        val random = new Random();
        if (quotes.size() > 1) {
            val randomQuote = quotes.get(random.nextInt(quotes.size()));
            dto.setQuote(modelMapper.map(randomQuote, CharacterQuoteDTO.class));
        } else if (quotes.size() == 1) {
            dto.setQuote(modelMapper.map(quotes.get(0), CharacterQuoteDTO.class));
        }

        ArrayList<ImageDTO> imagesList = new ArrayList<>();
        val imagesFromDb = imageRepository.getImagesForCharacter(externalId);

        if (imagesFromDb != null) {
            for (val images : imagesFromDb) {
                imagesList.add(modelMapper.map(images, ImageDTO.class));
            }
        }
        dto.setImagesList(imagesList);

        val image = imageRepository.getProfilePicForCharacter(oneCharacter.getExternalId());
        String profilePic = null;
        if (image != null) {
            profilePic = UtilsShared.GetProfilePicBase64Code(image.getExtension(), image.getImage());
        }
        dto.setProfilePic(profilePic);

        ArrayList<BookForCharacter> bookForCharacters = new ArrayList<>();
        val books = bookRepository.getNonEmptyBooksSorted();
        if (books != null) {
            for (val book : books) {
                ArrayList<ChapterForCharacter> chapterForCharacters = new ArrayList<>();
                ArrayList<Chapter> chapters = chapterRepository.getVisibleChaptersForBook(book.getExternalId());
                if (chapters != null) {
                    for (val chapter : chapters) {

                        val chapterForCharacter = new ChapterForCharacter(chapter);
                        val starringTypefromDb = starringCharactersRepository.getStarringCharacterTypeByChapterAndCharId(externalId, chapter.getExternalId());
                        val starringType = starringTypefromDb == null ? StarringType.NONE : starringTypefromDb;
                        chapterForCharacter.setStarringType(starringType);

                        chapterForCharacters.add(chapterForCharacter);
                    }
                }

                val bookForCharacter = new BookForCharacter();
                bookForCharacter.setBook(book);
                bookForCharacter.setChapters(chapterForCharacters);

                bookForCharacters.add(bookForCharacter);
            }
        }

        dto.setStarringIn(bookForCharacters);

        val tags = tagRepository.getTagsForCharacter(externalId);

        List<TagDTO> tagDTOS = new ArrayList<>();
        for (val tag : tags) {
            val tagDTO = new TagDTO(tag.getId(), tag.getName(), tag.getColor());
            tagDTOS.add(tagDTO);
        }
        dto.setTags(tagDTOS);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    public ResponseEntity changeStatusForCharacter(ChangeCharacterStateRequest character) {
        val charToChange = characterRepository.getOne(character.getId());
        if (charToChange == null) {
            return new ResponseEntity<>("Nie można zmienić stanu postaci o nieistniejącym id.",
                    HttpStatus.NOT_FOUND);
        }
        charToChange.setArchived(character.getArchived());
        characterRepository.save(charToChange);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity upsertCharacter(EditCharacterRequest request) {

        if (request.getExternalId() == 0) {
            Character createdCharacter = new Character();
            createdCharacter.setCharName(request.getCharName());

            characterRepository.saveAndFlush(createdCharacter);
            return new ResponseEntity(createdCharacter.getExternalId(), HttpStatus.CREATED);
        }

        val character = characterRepository.getOne(request.getExternalId());

        if (character == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        character.updateCharacter(request);

        characterRepository.saveAndFlush(character);

        var colors = colorsRepository.getColorsForCharacter(request.getExternalId());
        if (colors == null) {
            colors = new Colors();
            colors.setCharacter(character);
        }
        colors.updateColors(request.getColors());
        colorsRepository.saveAndFlush(colors);

        var temperament = temperamentRepository.getTemperamentForCharacter(request.getExternalId());
        if (temperament == null) {
            temperament = new Temperament();
            temperament.setCharacter(character);
        }
        temperament.updateTemperament(request.getTemperament());

        temperamentRepository.saveAndFlush(temperament);

        var measurements = measurementsRepository.getMeasurementsById(request.getExternalId());
        if (request.getMeasurements() != null) {
            if (measurements == null) {
                measurements = new Measurements();
                measurements.setCharacter(character);
            }
            measurements.updateMeasurements(request.getMeasurements());
            measurementsRepository.saveAndFlush(measurements);
        }

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity deleteCharacter(Long id) {
        val character = characterRepository.getOne(id);
        Temperament temperament = temperamentRepository.getTemperamentForCharacter(id);
        if (temperament != null) {
            temperamentRepository.delete(temperament);
        }

        var measurement = measurementsRepository.getMeasurementsById(id);
        if (measurement != null) {
            measurementsRepository.delete(measurement);
        }

        var colors = colorsRepository.getColorsForCharacter(id);
        if (colors != null) {
            colorsRepository.delete(colors);
        }

        val quotes = quoteRepository.getAllQuotesByCharacterId(id);
        quotes.forEach(quote -> quoteRepository.delete(quote));


        val images = imageRepository.getImagesForCharacter(id);
        images.forEach(image -> imageRepository.delete(image));
        Image profilePicForCharacter = imageRepository.getProfilePicForCharacter(id);
        if (profilePicForCharacter != null) {
            imageRepository.delete(profilePicForCharacter);
        }

        val storiesForCharacter = characterStoryRepository.getStoriesForCharacter(id);
        storiesForCharacter.forEach(characterStory -> characterStoryRepository.delete(characterStory));

        val preferences = preferenceRepository.getAllPreferencesForCharacter(id);
        preferences.forEach(preference -> preferenceRepository.delete(preference));

        val starringCharacters = starringCharactersRepository.getStarringCharactersByCharacterId(id);
        starringCharacters.forEach(starringCharacter -> starringCharactersRepository.delete(starringCharacter));

        val relationCoordinates = relationCoordinatesRepository.getAllRelationsForCharacter(id);
        relationCoordinates.forEach(relationCoordinate -> relationCoordinatesRepository.delete(relationCoordinate));

        val relationList = relationsRepository.getRelationsForCharacter(id);
        relationList.forEach(relation -> relationsRepository.delete(relation));

        val characterTags = characterTagRepository.getCharacterTagsForCharacter(id);
        characterTags.forEach(characterTag -> characterTagRepository.delete(characterTag));

        characterRepository.delete(character);
        return new ResponseEntity(HttpStatus.OK);
    }

    //#region Images
    public ResponseEntity newImages(MultipartHttpServletRequest multipartHttpServletRequest, Long id) {
        val allFiles = multipartHttpServletRequest.getFileMap();
        Character character = characterRepository.getOne(id);
        if (character == null) {
            val msg = "Nie znaleziono postaci o podanym id.";
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
        }
        val it = allFiles.entrySet().iterator();
        while (it.hasNext()) {
            val image = new Image();
            val pair = it.next();
            val key = String.valueOf(pair.getKey());
            image.setIsProfilePic(key.equals("profilePic"));
            val file = (MultipartFile) pair.getValue();

            if (file != null) {
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                String extension = FilenameUtils.getExtension(fileName);

                if (!Stream.of(AvailableExtensions.values()).anyMatch(v -> v.name().equalsIgnoreCase(extension))) {
                    return new ResponseEntity(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
                }
                try {
                    if (image.getIsProfilePic()) {
                        Image oldProfilePic = imageRepository.getProfilePicForCharacter(character.getExternalId());
                        if (oldProfilePic != null) {
                            imageRepository.delete(oldProfilePic);
                        }
                    }

                    byte[] byteArr = file.getBytes();
                    image.setImage(byteArr);
                    image.setName(FilenameUtils.removeExtension(file.getOriginalFilename()));
                    image.setExtension(extension);
                    image.setCharacter(character);

                    imageRepository.saveAndFlush(image);

                } catch (IOException e) {
                }

                it.remove();
            }
        }
        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity changeImageName(ImageRenameRequest request) {
        val image = imageRepository.getOne(request.getId());
        if (image == null) {
            val msg = "Brak obrazka o podanym id.";
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
        }
        image.setName(request.getName());
        imageRepository.saveAndFlush(image);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity changeImagesOrder(Long[] ids) {
        for (int i = 0; i < ids.length; i++) {
            val currentId = ids[i];
            val image = imageRepository.getOne(currentId);
            if (image == null) {
                continue;
            }
            image.setImageOrder(i);
            imageRepository.saveAndFlush(image);
        }

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity deleteImage(Long id) {
        val imageToDelete = imageRepository.getOne(id);
        if (imageToDelete == null) {
            val msg = "Nie znaleziono obrazka.";
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
        }
        imageRepository.delete(imageToDelete);
        return new ResponseEntity(HttpStatus.OK);
    }

    //#endregion

    //#region Quotes
    public ResponseEntity upsertQuote(UpsertQuoteRequest request) {
        if (request.getQuoteId() == 0) {
            val quote = new Quote();
            quote.setQuote(request.getQuote());
            quote.setContext(request.getContext());
            val character = characterRepository.getOne(request.getCharacterId());
            if (character == null) {
                String msg = "Nie znaleziono postaci o podanym id.";
                return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
            }
            ArrayList<Quote> quotesForChar = new ArrayList<>();
            quotesForChar.add(quote);
            character.setQuotes(quotesForChar);
            quote.setCharacter(character);
            quoteRepository.saveAndFlush(quote);
            return new ResponseEntity(HttpStatus.CREATED);
        } else {
            val quote = quoteRepository.getOne(request.getQuoteId());
            if (quote == null) {
                val msg = "Nie znaleziono cytatu.";
                return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
            }
            quote.setQuote(request.getQuote());
            quote.setContext(request.getContext());
            quoteRepository.saveAndFlush(quote);
        }
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity getAllQuotesForCharacter(Long id) {
        val modelMapper = new ModelMapper();
        val result = new ArrayList<>();

        val quotesFromDb = quoteRepository.getAllQuotesByCharacterId(id);
        if (quotesFromDb != null) {
            for (val quoteFromDb : quotesFromDb) {
                val dto = modelMapper.map(quoteFromDb, CharacterQuoteDTO.class);
                result.add(dto);
            }
        }
        return new ResponseEntity(result, HttpStatus.OK);
    }

    public ResponseEntity deleteQuote(Long id) {
        val quoteToDelete = quoteRepository.getOne(id);
        if (quoteToDelete == null) {
            String msg = "Nie ma takiego cytatu bądź został już wcześniej usunięty.";
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
        }
        quoteRepository.delete(quoteToDelete);
        return new ResponseEntity(HttpStatus.OK);
    }

    //#endregion

    //#region Relations

    public ResponseEntity getRelations(Long id) {

        val relationsFromDb = relationsRepository.getRelationsForCharacter(id);

        val result = new ArrayList<>();
        Map<Long, List<Relation>> relationsMap = new HashMap<>();

        for (val relationFromDb : relationsFromDb) {
            Long relatedCharExternalId = relationFromDb.getRelatedCharacter().getExternalId();
            if (relatedCharExternalId.equals(id)) {
                relatedCharExternalId = relationFromDb.getCharacter().getExternalId();
            }
            val containsId = relationsMap.containsKey(relatedCharExternalId);

            List<Relation> relationList = new ArrayList<>();
            if (containsId) {
                relationList = relationsMap.get(relatedCharExternalId);
            }
            relationList.add(relationFromDb);
            if (containsId) {
                relationsMap.replace(relatedCharExternalId, relationsMap.get(relatedCharExternalId), relationList);
            } else {
                relationsMap.put(relatedCharExternalId, relationList);
            }
        }


        for (val entry : relationsMap.entrySet()) {
            val characterId = entry.getKey();
            val relations = entry.getValue();

            val person = new RelatedPersonData();
            val relatedChar = characterRepository.getOne(characterId);
            if (relatedChar == null) {
                continue;
            }

            person.setId(relatedChar.getExternalId());
            person.setFullName(relatedChar.getCharName() != null ? relatedChar.getCharName() : "?"
                    + " "
                    + relatedChar.getCharSurname() != null ? relatedChar.getCharSurname() : "");
            val image = imageRepository.getProfilePicForCharacter(relatedChar.getExternalId());
            String profilePic = null;
            if (image != null) {
                profilePic = UtilsShared.GetProfilePicBase64Code(image.getExtension(), image.getImage());
            }
            person.setImageMimeData(profilePic);

            List<RelationDTO> relationDTOS = new ArrayList<>();

            for (val relation : relations) {
                val isSource = !relation.getRelatedCharacter().getExternalId().equals(id);
                val relationDTO = new RelationDTO(
                        relation.getId(),
                        relation.getType(),
                        isSource,
                        relation.getRelationDateStart(),
                        relation.getRelationDateEnd());
                relationDTOS.add(relationDTO);
            }
            val relationForCharacter = new RelationForCharacter(person, relationDTOS);
            result.add(relationForCharacter);
        }

        return new ResponseEntity(result, HttpStatus.OK);
    }

    public ResponseEntity upsertRelations(List<RelationRequest> request, Long charId) {
        val relationsFromDb = relationsRepository.getRelationsForCharacter(charId);

        val relationsFromDbIds = relationsFromDb.stream().map(Relation::getId).collect(Collectors.toList());
        val relationsFromRequestIds = request.stream().map(RelationRequest::getId).collect(Collectors.toList());

        val relationsToAdd = request.stream()
                .filter((RelationRequest relationFromRequest) ->
                        !relationsFromDbIds.contains(relationFromRequest.getId())
                ).collect(Collectors.toList());

        relationsToAdd.forEach(relationRequest -> {
            Character character1 = characterRepository.getOne(relationRequest.getSourceCharacterId());
            Character character2 = characterRepository.getOne(relationRequest.getTargetCharacterId());

            Relation relation = new Relation();
            relation.setCharacter(character1);
            relation.setRelatedCharacter(character2);
            relation.setRelationDateEnd(relationRequest.getRelationDateEnd());
            relation.setRelationDateStart(relationRequest.getRelationDateStart());
            relation.setType(relationRequest.getType());
            relationsRepository.saveAndFlush(relation);
        });


        List<RelationRequest> relationsToUpdate = request.stream()
                .filter((RelationRequest relationFromRequest) ->
                        relationsFromDbIds.contains(relationFromRequest.getId())
                ).collect(Collectors.toList());

        relationsToUpdate.forEach(relationRequest -> {
            Character character1 = characterRepository.getOne(relationRequest.getSourceCharacterId());
            Character character2 = characterRepository.getOne(relationRequest.getTargetCharacterId());

            Relation relation = relationsRepository.getRelationById(relationRequest.getId());

            relation.setCharacter(character1);
            relation.setRelatedCharacter(character2);
            relation.setRelationDateEnd(relationRequest.getRelationDateEnd());
            relation.setRelationDateStart(relationRequest.getRelationDateStart());
            relation.setType(relationRequest.getType());

            relationsRepository.saveAndFlush(relation);
        });


        List<Relation> relationsToDelete = relationsFromDb.stream()
                .filter((Relation relationFromDb) -> !relationsFromRequestIds.contains(relationFromDb.getId())
                ).collect(Collectors.toList());

        relationsToDelete.forEach(relationToDelete -> {
            Long characterId = relationToDelete.getCharacter().getExternalId();
            Long characterRelatedId = relationToDelete.getRelatedCharacter().getExternalId();


            Boolean hasAnyRemainingRelations = !relationsRepository.getRelationsForBoth(characterId, characterRelatedId).isEmpty();
            if (!hasAnyRemainingRelations) {
                RelationCoordinates relationCoordinates = relationCoordinatesRepository.getCoordinatesForCharacterAndRelatedCharacter(characterId, characterRelatedId);
                RelationCoordinates relationSwappedCoordinates = relationCoordinatesRepository.getCoordinatesForCharacterAndRelatedCharacter(characterRelatedId, characterId);

                if (relationCoordinates != null) {
                    relationCoordinatesRepository.delete(relationCoordinates);
                }
                if (relationSwappedCoordinates != null) {
                    relationCoordinatesRepository.delete(relationSwappedCoordinates);
                }
            }
            relationsRepository.delete(relationToDelete);

        });

        return new ResponseEntity(HttpStatus.OK);

    }

    public ResponseEntity getRelationsTreeData(Long id) {
        RelationTreeDto result = new RelationTreeDto();

        if (id == null || id == 0) {
            return new ResponseEntity(null, HttpStatus.OK);
        }
        Character character = characterRepository.getOne(id);
        if (character == null) {
            return new ResponseEntity(result, HttpStatus.NOT_FOUND);
        }


        HashSet<RelationTreePersonDto> persons = new HashSet<RelationTreePersonDto>();
        HashSet<RelationTreeRelationDto> relations = new HashSet<RelationTreeRelationDto>();

        HashSet<Character> characters = new HashSet<>();
        characters.add(character);

        // Relations
        List<Relation> existingRelations = relationsRepository.getRelationsForCharacter(id);
        for (Relation existingRelation : existingRelations) {
            characters.add(existingRelation.getCharacter());
            characters.add(existingRelation.getRelatedCharacter());

            //#region RelationTreeRelationDto handle
            RelationType type = RelationType.valueOf("" + existingRelation.getType());

            RelationTreeRelationDto relationDto = new RelationTreeRelationDto();
            relationDto.setType(type);
            relationDto.setRelationDateStart(existingRelation.getRelationDateStart());
            relationDto.setRelationDateEnd(existingRelation.getRelationDateEnd());
            relationDto.setSource(existingRelation.getCharacter().getExternalId());
            relationDto.setTarget(existingRelation.getRelatedCharacter().getExternalId());

            relations.add(relationDto);
            //#endregion
        }

        // Coordinates
        List<Long> characterIds = characters.stream().map(Character::getExternalId).collect(Collectors.toList());
        List<RelationCoordinates> relationCoordinates = relationCoordinatesRepository.getCoordinatesInCharacterRelationTree(id, characterIds);

        // Persons
        for (Character characterFromDb : characters) {
            RelationTreePersonDto personDto = new RelationTreePersonDto();
            personDto.setId(characterFromDb.getExternalId());
            String name = characterFromDb.getCharName() != null ? characterFromDb.getCharName() : "?";
            String surname = characterFromDb.getCharSurname() != null ? characterFromDb.getCharSurname() : "";

            personDto.setFullName(
                    name + " " + surname
            );

            Image image = imageRepository.getProfilePicForCharacter(characterFromDb.getExternalId());
            String profilePic = null;
            if (image != null) {
                profilePic = UtilsShared.GetProfilePicBase64Code(image.getExtension(), image.getImage());
            }
            personDto.setImageMimeData(profilePic);

            RelationCoordinates personCoordinates = relationCoordinates
                    .stream().parallel()
                    .filter(relationCoordinate -> relationCoordinate.targetCharacter.getExternalId() == personDto.getId()).findFirst().orElse(null);
            if (personCoordinates != null) {
                personDto.setCoordinates(new CoordinatesDTO(personCoordinates.getXTarget(), personCoordinates.getYTarget()));
            }

            persons.add(personDto);
        }

        result.setPersons(persons);
        result.setRelations(relations);

        return new ResponseEntity(result, HttpStatus.OK);

    }

    public ResponseEntity upsertCoords(Long id, List<CoordinatesRequest> request) {
        Character character = characterRepository.getOne(id);
        if (character == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        for (CoordinatesRequest coordinateRequest : request) {
            RelationCoordinates coordinates = relationCoordinatesRepository.getCoordinatesForCharacterAndRelatedCharacter(id, coordinateRequest.getCharacterId());
            Character relatedCharacter = characterRepository.getOne(coordinateRequest.getCharacterId());

            if (relatedCharacter == null) {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }

            if (coordinates == null) {
                RelationCoordinates relationCoordinates1 = new RelationCoordinates(character, relatedCharacter, coordinateRequest.getX(), coordinateRequest.getY());
                relationCoordinatesRepository.saveAndFlush(relationCoordinates1);
            } else {
                coordinates.setXTarget(coordinateRequest.getX());
                coordinates.setYTarget(coordinateRequest.getY());
                relationCoordinatesRepository.saveAndFlush(coordinates);

            }

        }


        return new ResponseEntity(HttpStatus.OK);
    }

    //#endregion

    //#region Stories
    public ResponseEntity getStoriesForCharacter(Long id) {
        ModelMapper modelMapper = new ModelMapper();
        List<CharacterStory> storiesForCharacter = characterStoryRepository.getStoriesForCharacter(id);
        ArrayList<CharacterStoryDTO> stories = new ArrayList<>();
        if (storiesForCharacter != null && storiesForCharacter.size() > 0) {
            for (CharacterStory story : storiesForCharacter) {
                stories.add(modelMapper.map(story, CharacterStoryDTO.class));
            }
        }

        return new ResponseEntity(stories, HttpStatus.OK);
    }

    public ResponseEntity deleteStory(Long storyId) {
        CharacterStory characterStory = characterStoryRepository.getOne(storyId);
        if (characterStory == null) {
            return new ResponseEntity("Nie ma historii o takim id lub została wcześniej usunięta.", HttpStatus.NOT_FOUND);
        }
        characterStoryRepository.delete(characterStory);
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity editStoryIndexes(ArrayList<Long> storyIds, Long charId) {
        List<CharacterStory> characterStories = characterStoryRepository.getStoriesForCharacter(charId);
        HashMap<Long, Integer> storyFromDatabase = new HashMap<>();

        for (int i = 0; i < characterStories.size(); i++) {
            CharacterStory characterStory = characterStories.get(i);
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

    public ResponseEntity upsertStoryForCharacter(StoryRequest request) {
        Character character = characterRepository.getOne(request.getCharacterId());
        if (character == null) {
            return new ResponseEntity("Nie można utworzyć historii dla nieistniejącej postaci.", HttpStatus.NOT_FOUND);
        }

        if (request.getStoryId() == 0) {
            CharacterStory characterStory = new CharacterStory();
            characterStory.setCharacter(character);
            characterStory.setStoryDesc(request.getStory());
            characterStory.setTitle(request.getTitle());

            List<CharacterStory> characterStories = characterStoryRepository.getStoriesForCharacter(character.getExternalId());
            characterStory.setIndexOnList(characterStories.size() + 1);

            characterStoryRepository.saveAndFlush(characterStory);
        } else {
            CharacterStory characterStory = characterStoryRepository.getOne(request.getStoryId());
            if (characterStory == null) {
                return new ResponseEntity("Nie można edytować historii, która nie istnieje.", HttpStatus.NOT_FOUND);
            }
            characterStory.setTitle(request.getTitle());
            characterStory.setStoryDesc(request.getStory());
            characterStoryRepository.saveAndFlush(characterStory);

            return new ResponseEntity(HttpStatus.OK);
        }


        return new ResponseEntity(HttpStatus.CREATED);
    }

    //#endregion

    //#region Preferences
    public ResponseEntity editPreferences(PreferenceRequest preferenceRequest) {
        Preference preference = new Preference();
        Character character = characterRepository.getOne(preferenceRequest.getCharacterId());
        Character preferedCharacter = characterRepository.getOne(preferenceRequest.getPreferedCharacterId());

        if (preferenceRequest.getDate() == null) {
            Preference currentPref = preferenceRepository
                    .getCurrentPreferenceForCharacters(preferenceRequest.getCharacterId(), preferenceRequest.getPreferedCharacterId());

            if (currentPref != null) {
                currentPref.setRange(preferenceRequest.getRange());
                currentPref.setDateOfOrigin(preferenceRequest.getDate());
                preferenceRepository.saveAndFlush(currentPref);
                return new ResponseEntity(HttpStatus.OK);
            }
        }
        if (character == preferedCharacter) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        if (character == null || preferedCharacter == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        preference.setCharacter(character);
        preference.setPreferedCharacter(preferedCharacter);
        preference.setRange(preferenceRequest.getRange());
        preference.setDateOfOrigin(preferenceRequest.getDate());

        preferenceRepository.saveAndFlush(preference);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity getAllPreferencesForCharacter(Long charId) {
        ArrayList<AllPreferencesDTO> dtos = new ArrayList<>();
        List<Long> relatedCharIds = preferenceRepository.getRelatedCharsIds(charId);
        if (relatedCharIds != null && relatedCharIds.size() > 0) {
            for (Long id : relatedCharIds) {
                Character character = characterRepository.getOne(id);

                List<Preference> historicalPreferences = preferenceRepository
                        .getHistoricalPreferences(charId, id);

                List<Preference> backwardPreferences = preferenceRepository
                        .getHistoricalPreferences(id, charId);

                AllPreferencesDTO dto = new AllPreferencesDTO();
                ArrayList<HistoricPreferenceDTO> historicPreferenceDTOS = new ArrayList<>();
                ArrayList<HistoricPreferenceDTO> backwardPreferenceDTOS = new ArrayList<>();

                String name = character.getCharName() != null ? character.getCharName() : "?";
                String surname = character.getCharSurname() != null ? character.getCharSurname() : "";
                String fullName = name + " " + surname;

                dto.setCharacterId(character.getExternalId());
                dto.setCharacterFullname(fullName);

                if (historicalPreferences != null && historicalPreferences.size() > 0) {
                    for (Preference pref : historicalPreferences) {
                        HistoricPreferenceDTO historicPreferenceDTO = new HistoricPreferenceDTO();
                        if (pref.getDateOfOrigin() != null) {
                            historicPreferenceDTO.setDateOfOrigin(pref.getDateOfOrigin().toString());
                        }
                        historicPreferenceDTO.setId(pref.getId());
                        historicPreferenceDTO.setRange(pref.getRange());
                        historicPreferenceDTOS.add(historicPreferenceDTO);
                    }
                }

                if (backwardPreferences != null && backwardPreferences.size() > 0) {
                    for (Preference pref : backwardPreferences) {
                        HistoricPreferenceDTO backwardPreferenceDTO = new HistoricPreferenceDTO();
                        if (pref.getDateOfOrigin() != null) {
                            backwardPreferenceDTO.setDateOfOrigin(pref.getDateOfOrigin().toString());
                        }
                        backwardPreferenceDTO.setId(pref.getId());
                        backwardPreferenceDTO.setRange(pref.getRange());
                        backwardPreferenceDTOS.add(backwardPreferenceDTO);
                    }
                }


                dto.setPreferences(historicPreferenceDTOS);
                dto.setBackwardPreferences(backwardPreferenceDTOS);

                dtos.add(dto);
            }

        }

        return new ResponseEntity(dtos, HttpStatus.OK);
    }

    public ResponseEntity getHistoricalPreferencesForCharacter(Long charId, Long relatedCharId) {
        Character character = characterRepository.getOne(relatedCharId);
        AllPreferencesDTO dto = new AllPreferencesDTO();
        dto.setCharacterId(relatedCharId);
        if (character != null) {
            String name = character.getCharName() != null ? character.getCharName() : "?";
            String surname = character.getCharSurname() != null ? character.getCharSurname() : "";
            String fullName = name + " " + surname;

            dto.setCharacterFullname(fullName);
            dto.setCharacterId(character.getExternalId());

            ArrayList<HistoricPreferenceDTO> historicPreferenceDTOS = new ArrayList<>();
            ArrayList<Preference> preferences = preferenceRepository.getHistoricalPreferences(charId, relatedCharId);
            if (preferences != null && preferences.size() > 0) {
                for (Preference preference : preferences) {
                    HistoricPreferenceDTO historicPreferenceDTO = new HistoricPreferenceDTO();
                    if (preference.getDateOfOrigin() != null) {
                        historicPreferenceDTO.setDateOfOrigin(preference.getDateOfOrigin().toString());
                    }
                    historicPreferenceDTO.setRange(preference.getRange());

                    historicPreferenceDTOS.add(historicPreferenceDTO);
                }
            }
            dto.setPreferences(historicPreferenceDTOS);
        }


        return new ResponseEntity(dto, HttpStatus.OK);
    }

    public ResponseEntity deletePreference(Long id) {
        Preference preference = preferenceRepository.getOne(id);
        if (preference != null) {
            preferenceRepository.delete(preference);
        }

        return new ResponseEntity(HttpStatus.OK);
    }
    //#endregion


}
