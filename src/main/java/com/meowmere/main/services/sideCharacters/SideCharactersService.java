package com.meowmere.main.services.sideCharacters;

import com.meowmere.main.dto.sideCharacters.*;
import com.meowmere.main.entities.characters.Character;
import com.meowmere.main.entities.relationships.Relationship;
import com.meowmere.main.entities.sideCharacters.Book;
import com.meowmere.main.entities.sideCharacters.ProfilePic;
import com.meowmere.main.entities.sideCharacters.SideCharacter;
import com.meowmere.main.repositories.character.CharacterRepository;
import com.meowmere.main.repositories.sideCharacters.BookRepository;
import com.meowmere.main.repositories.sideCharacters.ProfilePicRepository;
import com.meowmere.main.repositories.sideCharacters.RelationshipRepository;
import com.meowmere.main.repositories.sideCharacters.SideCharactersRepository;
import com.meowmere.main.requests.sideCharacters.EditRelationNameRequest;
import com.meowmere.main.requests.sideCharacters.EditSideCharRequest;
import com.meowmere.main.requests.sideCharacters.NewRelationForSideCharRequest;
import com.meowmere.main.requests.sideCharacters.SideCharacterChangeRequest;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SideCharactersService {
    @Autowired
    public SideCharactersRepository sideCharactersRepository;
    @Autowired
    public BookRepository bookRepository;
    @Autowired
    public ProfilePicRepository profilePicRepository;
    @Autowired
    public RelationshipRepository relationshipRepository;
    @Autowired
    public CharacterRepository characterRepository;

    private void setSideCharactersBooks(SideCharacter sideCharacterFromDb, SideCharacterDetailsDTO dto) {
        ModelMapper modelMapper = new ModelMapper();
        ArrayList<BookDTO> booksForSide = new ArrayList<>();
        List<Book> books = sideCharacterFromDb.getBooks();
        if(books != null) {
            for (Book book : books) {
                BookDTO bookDTO = modelMapper.map(book, BookDTO.class);
                booksForSide.add(bookDTO);
            }
        }
        dto.setBooks(booksForSide);
    }

    public ArrayList<SideCharacterDTO> findNonArchivedSideCharacters(
            Optional<String> name,
            Optional<List<Long>> bookIds,
            Optional<Long> relatedTo
    ) {
        ArrayList<SideCharacterDTO> result = new ArrayList<>();

        String nameRequired = name.orElse("");
        List<Long> bookIdsRequired = bookIds.orElse(new ArrayList<Long>(Arrays.asList((long)-1)));
        Long relatedToRequired = relatedTo.orElse((long)-1);

        List<Relationship> filteredRelationsByCharIdNameAndBooks = relationshipRepository.getFilteredRelationsByCharIdNameAndBooks(relatedToRequired, nameRequired, bookIdsRequired);
        List<SideCharacter> sideCharacters = filteredRelationsByCharIdNameAndBooks.stream().map(x->x.getSideCharacter()).collect(Collectors.toList());
        ModelMapper modelMapper = new ModelMapper();

        for (SideCharacter sideCharacterFromDb : sideCharacters) {
            SideCharacterDTO sideCharacter = modelMapper.map(sideCharacterFromDb, SideCharacterDTO.class);
            ArrayList<BookDTO> booksForSide = new ArrayList<>();
            List<Book> books = sideCharacterFromDb.getBooks();
            if(books != null) {
                for (Book bookForSideChar : books) {
                BookDTO bookDTO = modelMapper.map(bookForSideChar, BookDTO.class);
                booksForSide.add(bookDTO);
                }
            }
            sideCharacter.setBooks(booksForSide);

            List<Relationship> relationships = sideCharacterFromDb.getRelationships();
            ArrayList<RelationshipDTO> relationshipDTOS = new ArrayList<>();
            if(relationships != null) {
                for (Relationship relationship : relationships) {
                    RelationshipDTO relationshipDTO = modelMapper.map(relationship, RelationshipDTO.class);
                    relationshipDTO.setRelativeName(relationship.getCharacter().getCharName());
                    relationshipDTO.setRelativeSurname(relationship.getCharacter().getCharSurname());
                    relationshipDTOS.add(relationshipDTO);
                }
            }
            sideCharacter.setRelationships(relationshipDTOS);

            ProfilePic profilePic = profilePicRepository.getProfilePicForCharacter(sideCharacter.getExternalId());
            if(profilePic != null) {
                ProfilePicDTO profilePicDTO = new ProfilePicDTO();
                profilePicDTO.setExtension(profilePic.getExtension());
                profilePicDTO.setImage(profilePic.getProfilePic());

                sideCharacter.setProfilePic(profilePicDTO);
            }

            result.add(sideCharacter);
        }
        return result;
    }

    public ResponseEntity findAllSideCharacters() {
        List<SideCharacter> sideCharactersFromDB = sideCharactersRepository
                .findAll(Sort.by(Sort.Direction.ASC, "sideCharacterName"));
        ModelMapper modelMapper = new ModelMapper();
        ArrayList<SideCharacterForListDTO> result = new ArrayList<>();

        for(SideCharacter sideCharacterFromDb : sideCharactersFromDB) {
            SideCharacterForListDTO sideCharacter = modelMapper.map(sideCharacterFromDb, SideCharacterForListDTO.class);
            ProfilePic profilePic = profilePicRepository.getProfilePicForCharacter(sideCharacter.getExternalId());
            if(profilePic != null) {
                ProfilePicDTO profilePicDTO = new ProfilePicDTO();
                profilePicDTO.setExtension(profilePic.getExtension());
                profilePicDTO.setImage(profilePic.getProfilePic());
                sideCharacter.setProfilePic(profilePicDTO);
            }
            result.add(sideCharacter);
        }
        return new ResponseEntity(result, HttpStatus.OK);
    }

    public ResponseEntity getSideCharacterDetails(Long id) {
        ModelMapper modelMapper = new ModelMapper();
        SideCharacter sideCharFromDb = sideCharactersRepository.getOne(id);
        if(sideCharFromDb == null) {
            String err = "Brak postaci o podanym id.";
            return new ResponseEntity(err, HttpStatus.NOT_FOUND);
        }
        SideCharacterDetailsDTO dto = modelMapper.map(sideCharFromDb, SideCharacterDetailsDTO.class);
        setSideCharactersBooks(sideCharFromDb, dto);
        return new ResponseEntity(dto, HttpStatus.OK);
    }

    public ResponseEntity getRelationsForSideChar(Long id){
        ModelMapper modelMapper = new ModelMapper();
        ArrayList<RelationshipDTO> relationshipDTOS = new ArrayList<>();
        List<Relationship> relationships = relationshipRepository.getRelationsForSideCharacter(id);
        if(relationships != null){
            for (Relationship relationship : relationships) {
                RelationshipDTO relationshipDTO = modelMapper.map(relationship, RelationshipDTO.class);
                relationshipDTO.setRelativeName(relationship.getCharacter().getCharName());
                relationshipDTO.setRelativeSurname(relationship.getCharacter().getCharSurname());
                relationshipDTOS.add(relationshipDTO);
            }
        }
        return new ResponseEntity(relationshipDTOS, HttpStatus.OK);
    }

    public ResponseEntity editSideCharacterDetails(EditSideCharRequest request){
        SideCharacter sideCharFromDb = sideCharactersRepository.getOne(request.getExternalId());
    if(sideCharFromDb == null) {
        String err = "Brak postaci o podanym id.";
        return new ResponseEntity(err, HttpStatus.NOT_FOUND);
    }
        sideCharFromDb.setSideCharacterDesc(request.getSideCharacterDesc());
        sideCharFromDb.setSideCharacterName(request.getSideCharacterName());
        sideCharFromDb.setSideCharacterSurname(request.getSideCharacterSurname());

        List<Long> bookIds = request.getBooksIds();
        ArrayList<Book> books = new ArrayList<>();
        List<Book> booksFromChar = sideCharFromDb.getBooks();
        if(bookIds != null) {
            for (Long bookId : bookIds) {
                boolean isAlready = Arrays.asList(booksFromChar).contains(bookId);
                if(!isAlready){
                books.add(bookRepository.getOne(bookId));
                }
            }
        }

        sideCharFromDb.setBooks(books);

        sideCharactersRepository.saveAndFlush(sideCharFromDb);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity editSideCharRelationName(EditRelationNameRequest request){
        Relationship relationship = relationshipRepository.getOne(request.getId());
        if (relationship == null) {
            String msg = "Nie znaleziono relacji o podanym id.";
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
        }
        relationship.setRelationType(request.getName());
        relationshipRepository.saveAndFlush(relationship);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity changeStateOfSideCharacter(SideCharacterChangeRequest sideChar) {
        SideCharacter sideCharFromDb = sideCharactersRepository.getOne(sideChar.getExternalId());
        if(sideCharFromDb == null) {
            String err = "Brak postaci o podanym id.";
            return new ResponseEntity(err, HttpStatus.NOT_FOUND);
        }
        sideCharFromDb.setArchived(sideChar.getArchived());
        sideCharactersRepository.saveAndFlush(sideCharFromDb);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity addNewSideCharacter(MultipartHttpServletRequest multipartHttpServletRequest){
        String name = multipartHttpServletRequest.getParameter("name");
        String surname = multipartHttpServletRequest.getParameter("surname");
        String desc = multipartHttpServletRequest.getParameter("desc");
        MultipartFile file = multipartHttpServletRequest.getFile("profilePic");
        String booksIdsAsString = multipartHttpServletRequest.getParameter("books");
        multipartHttpServletRequest.getFileMap();

        SideCharacter sideCharacter = new SideCharacter(name, surname, desc);
        sideCharactersRepository.saveAndFlush(sideCharacter);

        String[] idsAsString = booksIdsAsString.split(",");

        ArrayList<Book> books = new ArrayList<>();

        if(!booksIdsAsString.isEmpty()) {
        for (String idAsString : idsAsString) {
                Long id = Long.parseLong(idAsString);

                Book book = bookRepository.getOne(id);
                books.add(book);
                if(book != null) {
                    sideCharacter.setBooks(books);
                    sideCharactersRepository.saveAndFlush(sideCharacter);
                } else {
                    continue;
                }
            }
        }

        if(books.size() == 0) {
            sideCharacter.setBooks(null);
        }

        try {
            ProfilePic profilePicToSave = new ProfilePic();
            byte [] byteArr = file.getBytes();

            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            String extension = FilenameUtils.getExtension(fileName);

            profilePicToSave.setProfilePic(byteArr);
            profilePicToSave.setName(file.getOriginalFilename());
            profilePicToSave.setExtension(extension);
            profilePicToSave.setSideCharacter(sideCharacter);

            profilePicRepository.save(profilePicToSave);

        } catch (Exception e) {
            return new ResponseEntity("Nie udało się dodać zdjęcia.", HttpStatus.UNSUPPORTED_MEDIA_TYPE
            );
        }
        return new ResponseEntity(HttpStatus.CREATED);
        }

    public ResponseEntity editSideProfilePic(MultipartHttpServletRequest multipartHttpServletRequest) {
        MultipartFile file = multipartHttpServletRequest.getFile("profilePic");
        String externalIdAsString = multipartHttpServletRequest.getParameter("externalId");

        Long id = Long.parseLong(externalIdAsString);
        SideCharacter sideCharacter = sideCharactersRepository.getOne(id);

        if(sideCharacter == null) {
            String err = "Postać o podanym id nie istnieje.";
            return new ResponseEntity(err, HttpStatus.BAD_REQUEST);
        }
        try {
            if(file != null) {
                ProfilePic profilePicFromDb = profilePicRepository.getProfilePicForCharacter(sideCharacter.getExternalId());
                ProfilePic profilePic;
                if(profilePicFromDb == null) {
                    profilePic = new ProfilePic();
                    profilePic.setSideCharacter(sideCharacter);
                } else {profilePic = profilePicFromDb; }

                byte [] byteArr = file.getBytes();
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                String extension = FilenameUtils.getExtension(fileName);

                profilePic.setProfilePic(byteArr);
                profilePic.setName(file.getOriginalFilename());
                profilePic.setExtension(extension);

                profilePicRepository.saveAndFlush(profilePic);
            }
        } catch (Exception e) {
            return new ResponseEntity("Nie udało się dodać zdjęcia.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity getAllBooks() {
        ModelMapper modelMapper = new ModelMapper();
        List<Book> booksFromDb = bookRepository.findAll(Sort.by(Sort.Direction.ASC, "bookOrder"));
        ArrayList<BookDTO> result = new ArrayList<>();
        booksFromDb.forEach(book -> {
            BookDTO bookDTO = modelMapper.map(book, BookDTO.class);
            result.add(bookDTO);
        });

        return new ResponseEntity(result, HttpStatus.OK);
    }

    public ResponseEntity createNewRelationForSideChar(NewRelationForSideCharRequest request){
        Relationship relationshipToSave = new Relationship();
        relationshipToSave.setRelationType(request.getRelationName());
        SideCharacter sideCharacter = sideCharactersRepository.getOne(request.getSideCharacterId());
        Character character = characterRepository.getNonArchivedCharacter(request.getRelatedCharacterId());
        if(sideCharacter == null) {
            String msg = "Nie istnieje postać poboczna o podanym id.";
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
        }
        if (character == null) {
            String msg = "Nie istnieje postać po danym id lub została ona wcześniej zarchiwizowana.";
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
        }
        List<Relationship> relationshipsForSide =
                relationshipRepository.getRelationsForSideCharacter(request.getSideCharacterId());
        for (Relationship relationshipForSide: relationshipsForSide) {
            if( relationshipForSide.getCharacter().getExternalId() == character.getExternalId()){
                String msg = "Relacja tych dwóch postaci już została zdefiniowana.";
                return new ResponseEntity(msg, HttpStatus.BAD_REQUEST);
            }
        }

        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity deleteRelationForChar(Long id) {
                Relationship relationship = relationshipRepository.getOne(id);
        if (relationship == null) {
            String msg = "Nie ma takiej relacji bądź została ona już wcześniej usunięta";
            return new ResponseEntity(msg, HttpStatus.NOT_FOUND);
        }
        relationshipRepository.delete(relationship);
        return new ResponseEntity(HttpStatus.OK);
    }

}