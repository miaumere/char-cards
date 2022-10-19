package com.meowmere.main.services;


import com.meowmere.main.dto.character.character.CharacterDTO;
import com.meowmere.main.dto.character.character.CharacterDetailsDTO;
import com.meowmere.main.dto.character.character.CharactersMenuDTO;
import com.meowmere.main.dto.character.character.EveryCharacterMenuDTO;
import com.meowmere.main.dto.character.colors.CharacterColorDTO;
import com.meowmere.main.dto.character.image.ImageDTO;
import com.meowmere.main.dto.character.measurements.CharacterMeasurementsDTO;
import com.meowmere.main.dto.character.preference.AllPreferencesDTO;
import com.meowmere.main.dto.character.preference.HistoricPreferenceDTO;
import com.meowmere.main.dto.character.quote.CharacterQuoteDTO;
import com.meowmere.main.dto.character.quote.QuoteForListDTO;
import com.meowmere.main.dto.character.relation.*;
import com.meowmere.main.dto.character.starring.BookForCharacter;
import com.meowmere.main.dto.character.starring.ChapterForCharacter;
import com.meowmere.main.dto.character.story.CharacterStoryDTO;
import com.meowmere.main.dto.character.tags.TagDTO;
import com.meowmere.main.dto.character.temperament.CharacterTemperamentDTO;
import com.meowmere.main.dto.story.books.BookDTO;
import com.meowmere.main.dto.story.starring.BookWithStarringCharsDTO;
import com.meowmere.main.dto.story.starring.ChaptersWithCharStarringTypeDTO;
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
import org.apache.commons.io.FilenameUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;

import static java.util.Comparator.comparing;

import java.io.IOException;
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
        List<Character> allCharactersFromDb = isUserLogged ? characterRepository.getSortedCharacters() : characterRepository.getNonArchivedCharacters();
        allCharactersFromDb.sort(comparing(Character::getCharType).thenComparing(Character::getArchived).thenComparing(Character::getCharName));

        ArrayList<CharactersMenuDTO> dtoList = new ArrayList<>();

        for (Character characterFromDb : allCharactersFromDb) {
            Image image = imageRepository.getProfilePicForCharacter(characterFromDb.getExternalId());
            String profilePic = null;
            if (image != null) {
                profilePic = UtilsShared.GetProfilePicBase64Code(image.getExtension(), image.getImage());
            }
            CharactersMenuDTO dto = new CharactersMenuDTO(characterFromDb, profilePic);

            List<TagDTO> tagDTOS = new ArrayList<>();
            List<Tag> tags = tagRepository.getTagsForCharacter(characterFromDb.getExternalId());
            if (tags != null) {
                tags.forEach(tag -> tagDTOS.add(new TagDTO(tag.getId(), tag.getName(), tag.getColor())));
            }
            dto.setTags(tagDTOS);
            dtoList.add(dto);
        }
        return new ResponseEntity(dtoList, HttpStatus.OK);
    }

    public ResponseEntity getCharacter(Long externalId) {
        ModelMapper modelMapper = new ModelMapper();
        Character oneCharacter = characterRepository.getOne(externalId);
        if (oneCharacter == null) {
            String err = "Nie udało się znaleźć postaci o podanym id.";
            return new ResponseEntity<>(err, HttpStatus.NOT_FOUND);
        }

        CharacterDTO dto = modelMapper.map(oneCharacter, CharacterDTO.class);

        dto.setCharType(oneCharacter.getCharType().name());
        if (oneCharacter.getGender() != null) {
            dto.setGender(oneCharacter.getGender().name());
        }

        List<CharacterStory> storiesForCharacter = characterStoryRepository.getStoriesForCharacter(externalId);
        ArrayList<CharacterStoryDTO> stories = new ArrayList<>();
        if (storiesForCharacter != null && storiesForCharacter.size() > 0) {
            for (CharacterStory story : storiesForCharacter) {
                stories.add(modelMapper.map(story, CharacterStoryDTO.class));
            }
        }
        dto.setStory(stories);

        Colors colorsForCharacter = colorsRepository.getColorsForCharacter(externalId);
        if (colorsForCharacter != null) {
            dto.setColors(modelMapper.map(colorsForCharacter, CharacterColorDTO.class));
        }

        Temperament temperamentForCharacter = temperamentRepository.getTemperamentForCharacter(externalId);
        if (temperamentForCharacter != null) {
            dto.setTemperament(modelMapper.map(temperamentForCharacter, CharacterTemperamentDTO.class));
        }

        Measurements measurementsForCharacter = measurementsRepository.getMeasurementsById(externalId);
        if (measurementsForCharacter != null) {
            dto.setMeasurements(modelMapper.map(measurementsForCharacter, CharacterMeasurementsDTO.class));
        }


        List<Quote> quotes = quoteRepository.getAllQuotesByCharacterId(externalId);
        Random random = new Random();
        if (quotes.size() > 1) {
            Quote randomQuote = quotes.get(random.nextInt(quotes.size()));
            dto.setQuote(modelMapper.map(randomQuote, CharacterQuoteDTO.class));
        } else if (quotes.size() == 1) {
            dto.setQuote(modelMapper.map(quotes.get(0), CharacterQuoteDTO.class));
        }

        ArrayList<ImageDTO> imagesList = new ArrayList<>();
        List<Image> imagesFromDb = imageRepository.getImagesForCharacter(externalId);

        if (imagesFromDb != null) {
            for (Image images : imagesFromDb) {
                imagesList.add(modelMapper.map(images, ImageDTO.class));
            }
        }
        dto.setImagesList(imagesList);

        Image image = imageRepository.getProfilePicForCharacter(oneCharacter.getExternalId());
        String profilePic = null;
        if (image != null) {
            profilePic = UtilsShared.GetProfilePicBase64Code(image.getExtension(), image.getImage());
        }
        dto.setProfilePic(profilePic);

        ArrayList<BookForCharacter> bookForCharacters = new ArrayList<>();
        List<Book> books = bookRepository.findAll();
        if (books != null) {
            for (Book book : books) {
                ArrayList<ChapterForCharacter> chapterForCharacters = new ArrayList<>();
                ArrayList<Chapter> chapters = chapterRepository.getVisibleChaptersForBook(book.getExternalId());
                if (chapters != null) {
                    for (Chapter chapter : chapters) {

                        ChapterForCharacter chapterForCharacter = new ChapterForCharacter(chapter);
                        StarringType starringTypefromDb = starringCharactersRepository.getStarringCharacterTypeByChapterAndCharId(externalId, chapter.getExternalId());
                        StarringType starringType = starringTypefromDb == null ? StarringType.NONE : starringTypefromDb;
                        chapterForCharacter.setStarringType(starringType);

                        chapterForCharacters.add(chapterForCharacter);
                    }
                }

                BookForCharacter bookForCharacter = new BookForCharacter();
                bookForCharacter.setBook(book);
                bookForCharacter.setChapters(chapterForCharacters);

                bookForCharacters.add(bookForCharacter);
            }
        }

        dto.setStarringIn(bookForCharacters);

        List<Tag> tags = tagRepository.getTagsForCharacter(externalId);

        List<TagDTO> tagDTOS = new ArrayList<>();
        for (Tag tag : tags) {
            TagDTO tagDTO = new TagDTO(tag.getId(), tag.getName(), tag.getColor());
            tagDTOS.add(tagDTO);
        }
        dto.setTags(tagDTOS);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    public ResponseEntity changeStatusForCharacter(ChangeCharacterStateRequest character) {
        Character charToChange = characterRepository.getOne(character.getId());
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
            createdCharacter.setCharType(CharType.BACKGROUND);
            createdCharacter.setGender(Gender.UNKNOWNGENDER);

            characterRepository.saveAndFlush(createdCharacter);

            return new ResponseEntity(createdCharacter.getExternalId(), HttpStatus.CREATED);
        }

        Character character = characterRepository.getOne(request.getExternalId());

        if (character == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        character.setPseudonim(request.getPseudonim());
        character.setCharType(CharType.valueOf(request.getCharType()));
        character.setCharName(request.getCharName());
        character.setCharSurname(request.getCharSurname());
        character.setGender(Gender.valueOf(request.getGender()));
        character.setNationality(request.getNationality());
        character.setBirthday(request.getBirthday());
        character.setOccupation(request.getOccupation());

        if (request.getDeath() != null) {
            character.setDeath(request.getDeath() == null || request.getDeath() == 0 ? 0 : request.getDeath());
            character.setDeathReason(request.getDeathReason() == null ? "" : request.getDeathReason());
        }


        characterRepository.saveAndFlush(character);

        Colors colors = colorsRepository.getColorsForCharacter(request.getExternalId());
        if (colors == null) {
            colors = new Colors();
            colors.setCharacter(character);
        }
        colors.setThemeColor1(request.getColors().getThemeColor1());
        colors.setThemeColor2(request.getColors().getThemeColor2());
        colors.setThemeColor3(request.getColors().getThemeColor3());
        colors.setEyeColor1(request.getColors().getEyeColor1());
        colors.setEyeColor2(request.getColors().getEyeColor2());
        colors.setHairColor(request.getColors().getHairColor());
        colors.setSkinColor(request.getColors().getSkinColor());

        colorsRepository.saveAndFlush(colors);

        Temperament temperament = temperamentRepository.getTemperamentForCharacter(request.getExternalId());
        if (temperament == null) {
            temperament = new Temperament();
            temperament.setCharacter(character);
        }
        temperament.setMelancholic(request.getTemperament().getMelancholic());
        temperament.setCholeric(request.getTemperament().getCholeric());
        temperament.setFlegmatic(request.getTemperament().getFlegmatic());
        temperament.setSanguine(request.getTemperament().getSanguine());

        temperamentRepository.saveAndFlush(temperament);

        Measurements measurements = measurementsRepository.getMeasurementsById(request.getExternalId());
        if (request.getMeasurements() != null) {
            if (measurements == null) {
                measurements = new Measurements();
                measurements.setCharacter(character);
            }
            measurements.setBabyHeight(request.getMeasurements().getBabyHeight());
            measurements.setBabyWeight(request.getMeasurements().getBabyWeight());
            measurements.setChildHeight(request.getMeasurements().getChildHeight());
            measurements.setChildWeight(request.getMeasurements().getChildWeight());
            measurements.setTeenHeight(request.getMeasurements().getTeenHeight());
            measurements.setTeenWeight(request.getMeasurements().getTeenWeight());
            measurements.setAdultHeight(request.getMeasurements().getAdultHeight());
            measurements.setAdultWeight(request.getMeasurements().getAdultWeight());

            measurementsRepository.saveAndFlush(measurements);
        }

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity deleteCharacter(Long id) {
        Character character = characterRepository.getOne(id);
        Temperament temperament = temperamentRepository.getTemperamentForCharacter(id);
        if (temperament != null) {
            temperamentRepository.delete(temperament);
        }

        Measurements measurement = measurementsRepository.getMeasurementsById(id);
        if (measurement != null) {
            measurementsRepository.delete(measurement);
        }

        Colors colors = colorsRepository.getColorsForCharacter(id);
        if (colors != null) {
            colorsRepository.delete(colors);
        }

        List<Quote> quotes = quoteRepository.getAllQuotesByCharacterId(id);
        quotes.forEach(quote -> quoteRepository.delete(quote));


        List<Image> images = imageRepository.getImagesForCharacter(id);
        images.forEach(image -> imageRepository.delete(image));
        Image profilePicForCharacter = imageRepository.getProfilePicForCharacter(id);
        if (profilePicForCharacter != null) {
            imageRepository.delete(profilePicForCharacter);
        }

        List<CharacterStory> storiesForCharacter = characterStoryRepository.getStoriesForCharacter(id);
        storiesForCharacter.forEach(characterStory -> characterStoryRepository.delete(characterStory));

        List<Preference> preferences = preferenceRepository.getAllPreferencesForCharacter(id);
        preferences.forEach(preference -> preferenceRepository.delete(preference));

        List<StarringCharacters> starringCharacters = starringCharactersRepository.getStarringCharactersByCharacterId(id);
        starringCharacters.forEach(starringCharacter -> starringCharactersRepository.delete(starringCharacter));

        List<RelationCoordinates> relationCoordinates = relationCoordinatesRepository.getAllCoordinatesForCharacter(id);
        relationCoordinates.forEach(relationCoordinate -> relationCoordinatesRepository.delete(relationCoordinate));

        List<Relation> relationList = relationsRepository.getRelationsForCharacter(id);
        relationList.forEach(relation -> relationsRepository.delete(relation));

        List<CharacterTag> characterTags = characterTagRepository.getCharacterTagsForCharacter(id);
        characterTags.forEach(characterTag -> characterTagRepository.delete(characterTag));

        characterRepository.delete(character);
        return new ResponseEntity(HttpStatus.OK);
    }

    //#region Images
    public ResponseEntity newImages(MultipartHttpServletRequest multipartHttpServletRequest, Long id) {
        Map<String, MultipartFile> allFiles = multipartHttpServletRequest.getFileMap();
        Character character = characterRepository.getOne(id);
        if (character == null) {
            String msg = "Nie znaleziono postaci o podanym id.";
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
        }
        Iterator it = allFiles.entrySet().iterator();
        while (it.hasNext()) {
            Image image = new Image();
            Map.Entry pair = (Map.Entry) it.next();
            String key = String.valueOf(pair.getKey());
            image.setIsProfilePic(key.equals("profilePic"));
            MultipartFile file = (MultipartFile) pair.getValue();

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
        Image image = imageRepository.getOne(request.getId());
        if (image == null) {
            String msg = "Brak obrazka o podanym id.";
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
        }
        image.setName(request.getName());
        imageRepository.saveAndFlush(image);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity changeImagesOrder(Long[] ids) {
        for (int i = 0; i < ids.length; i++) {
            Long currentId = ids[i];
            Image image = imageRepository.getOne(currentId);
            if (image == null) {
                continue;
            }

            image.setImageOrder(i);
            imageRepository.saveAndFlush(image);
        }

        return new ResponseEntity(HttpStatus.NO_CONTENT);
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

    //#endregion

    //#region Quotes
    public ResponseEntity upsertQuote(UpsertQuoteRequest request) {
        if (request.getQuoteId() == 0) {
            Quote quote = new Quote();
            quote.setQuote(request.getQuote());
            quote.setContext(request.getContext());
            Character character = characterRepository.getOne(request.getCharacterId());
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
            Quote quote = quoteRepository.getOne(request.getQuoteId());
            if (quote == null) {
                String msg = "Nie znaleziono cytatu.";
                return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
            }
            quote.setQuote(request.getQuote());
            quote.setContext(request.getContext());
            quoteRepository.saveAndFlush(quote);
        }
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity getAllQuotesForCharacter(Long id) {
        ModelMapper modelMapper = new ModelMapper();
        ArrayList<QuoteForListDTO> result = new ArrayList<>();

        List<Quote> quotesFromDb = quoteRepository.getAllQuotesByCharacterId(id);
        if (quotesFromDb != null) {
            for (Quote quoteFromDb : quotesFromDb) {
                QuoteForListDTO dto = modelMapper.map(quoteFromDb, QuoteForListDTO.class);
                result.add(dto);
            }
        }
        return new ResponseEntity(result, HttpStatus.OK);
    }

    public ResponseEntity deleteQuote(Long id) {
        Quote quoteToDelete = quoteRepository.getOne(id);
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

        List<Relation> relationsFromDb = relationsRepository.getRelationsForCharacter(id);

        List<RelationForCharacter> result = new ArrayList<>();
        Map<Long, List<Relation>> relationsMap = new HashMap<>();

        for (Relation relationFromDb : relationsFromDb) {
            Long relatedCharExternalId = relationFromDb.getRelatedCharacter().getExternalId();
            if (relatedCharExternalId.equals(id)) {
                relatedCharExternalId = relationFromDb.getCharacter().getExternalId();
            }
            Boolean containsId = relationsMap.containsKey(relatedCharExternalId);

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


        for (Map.Entry<Long, List<Relation>> entry : relationsMap.entrySet()) {
            Long characterId = entry.getKey();
            List<Relation> relations = entry.getValue();

            RelatedPersonData person = new RelatedPersonData();
            Character relatedChar = characterRepository.getOne(characterId);
            if (relatedChar == null) {
                continue;
            }

            person.setId(relatedChar.getExternalId());
            person.setFullName(relatedChar.getCharName() != null ? relatedChar.getCharName() : "?"
                    + " "
                    + relatedChar.getCharSurname() != null ? relatedChar.getCharSurname() : "?");
            Image image = imageRepository.getProfilePicForCharacter(relatedChar.getExternalId());
            String profilePic = null;
            if (image != null) {
                profilePic = UtilsShared.GetProfilePicBase64Code(image.getExtension(), image.getImage());
            }
            person.setImageMimeData(profilePic);

            List<RelationDTO> relationDTOS = new ArrayList<>();

            for (Relation relation : relations) {
                Boolean isSource = !relation.getRelatedCharacter().getExternalId().equals(id);
                RelationDTO relationDTO = new RelationDTO(
                        relation.getId(),
                        relation.getType(),
                        isSource,
                        relation.getRelationDateStart(),
                        relation.getRelationDateEnd());
                relationDTOS.add(relationDTO);
            }
            RelationForCharacter relationForCharacter = new RelationForCharacter(person, relationDTOS);
            result.add(relationForCharacter);
        }

        return new ResponseEntity(result, HttpStatus.OK);
    }

    public ResponseEntity upsertRelations(List<RelationRequest> request, Long charId) {
        List<Relation> relationsFromDb = relationsRepository.getRelationsForCharacter(charId);

        List<Integer> relationsFromDbIds = relationsFromDb.stream().map(Relation::getId).collect(Collectors.toList());
        List<Integer> relationsFromRequestIds = request.stream().map(RelationRequest::getId).collect(Collectors.toList());

        List<RelationRequest> relationsToAdd = request.stream()
                .filter((RelationRequest relationFromRequest) -> {
                    return !relationsFromDbIds.contains(relationFromRequest.getId());
                }).collect(Collectors.toList());

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
                .filter((RelationRequest relationFromRequest) -> {
                    return relationsFromDbIds.contains(relationFromRequest.getId());
                }).collect(Collectors.toList());

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
                .filter((Relation relationFromDb) -> {
                    return !relationsFromRequestIds.contains(relationFromDb.getId());
                }).collect(Collectors.toList());

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
            String surname = characterFromDb.getCharSurname() != null ? characterFromDb.getCharSurname() : "?";

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

        if (request.storyId == 0) {
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
                String surname = character.getCharSurname() != null ? character.getCharSurname() : "?";
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
            String surname = character.getCharSurname() != null ? character.getCharSurname() : "?";
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
