package com.meowmere.main.Services.sideCharacters;

import com.meowmere.main.DTO.sideCharacters.BookDTO;
import com.meowmere.main.DTO.sideCharacters.SideCharacterDTO;
import com.meowmere.main.DTO.sideCharacters.SideCharacterDetailsDTO;
import com.meowmere.main.DTO.sideCharacters.SideCharacterForListDTO;
import com.meowmere.main.Entities.sideCharacters.Book;
import com.meowmere.main.Entities.sideCharacters.SideCharacter;
import com.meowmere.main.Enums.AvailableExtensions;
import com.meowmere.main.Repositories.sideCharacters.BookRepository;
import com.meowmere.main.Repositories.sideCharacters.SideCharactersRepository;
import com.meowmere.main.Requests.sideCharacters.EditSideCharRequest;
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
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

@Service
public class SideCharactersService {
    @Autowired
    public SideCharactersRepository sideCharactersRepository;
    @Autowired
    public BookRepository bookRepository;

    private void getSideCharacterProfilePic(SideCharacter sideCharacterFromDb, SideCharacterDTO dto) {
        try {
            String imagesURI = String.format("static\\side-character-profile-pics\\%s", sideCharacterFromDb.getExternalId());
            Resource resource = new ClassPathResource(imagesURI);
            File file = resource.getFile();
            File[] images = file.listFiles();
            if(images != null && images.length > 0){
            dto.setProfilePic(images[0].getName());
            } else {
                dto.setProfilePic(null);
            }
        } catch (IOException e) {
            dto.setProfilePic(null);
        }
    }
    private void getSideCharacterProfilePic(SideCharacter sideCharacterFromDb, SideCharacterForListDTO dto) {
        try {
            String imagesURI = String.format("static\\side-character-profile-pics\\%s", sideCharacterFromDb.getExternalId());
            Resource resource = new ClassPathResource(imagesURI);
            File file = resource.getFile();
            File[] images = file.listFiles();
            if(images.length > 0){
            dto.setProfilePic(images[0].getName());
            }
        } catch (IOException e) {
            dto.setProfilePic(null);
        }
    }
    private void setSideCharactersBooks(SideCharacter sideCharacterFromDb, SideCharacterDetailsDTO dto) {
        ModelMapper modelMapper = new ModelMapper();
        List<BookDTO> booksForSide = new ArrayList<>();
        List<Book> books = sideCharacterFromDb.getBooks();
        if(books != null) {
            for (Book book : books) {
                BookDTO bookDTO = modelMapper.map(book, BookDTO.class);
                booksForSide.add(bookDTO);
            }
        }
        dto.setBooks(booksForSide);
    }

    public ResponseEntity findNonArchivedSideCharacters() {
        List<SideCharacter> sideCharactersFromDb = sideCharactersRepository.getNonArchivedSideCharacters();
        ModelMapper modelMapper = new ModelMapper();
        List<SideCharacterDTO> result = new ArrayList<>();
        for (SideCharacter sideCharacterFromDb : sideCharactersFromDb) {
            SideCharacterDTO sideCharacter = modelMapper.map(sideCharacterFromDb, SideCharacterDTO.class);
            getSideCharacterProfilePic(sideCharacterFromDb, sideCharacter);

            List<BookDTO> booksForSide = new ArrayList<>();
            List<Book> books = sideCharacterFromDb.getBooks();
            if(books != null) {
                for (Book bookForSideChar : books) {
                BookDTO bookDTO = modelMapper.map(bookForSideChar, BookDTO.class);
                booksForSide.add(bookDTO);
                }
            }
            sideCharacter.setBooks(booksForSide);
            result.add(sideCharacter);
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
            getSideCharacterProfilePic(sideCharacterFromDb, sideCharacter);
            result.add(sideCharacter);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
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
        List<Book> books = new ArrayList<>();
        List<Book> booksFromChar = sideCharFromDb.getBooks();
        if(bookIds != null) {
            for (Long bookId : bookIds) {
                Boolean isAlready = Arrays.asList(booksFromChar).contains(bookId);
                if(!isAlready){
                books.add(bookRepository.getOne(bookId));
                }
            }
        }

        sideCharFromDb.setBooks(books);

        sideCharactersRepository.saveAndFlush(sideCharFromDb);
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
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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

        List<Book> books = new ArrayList<>();

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

        if(books == null) {
            sideCharacter.setBooks(null);
        }

        String stringForPathURI = String.format("src\\main\\resources\\static\\side-character-profile-pics\\%s",
                sideCharacter.getExternalId(), sideCharacter);
        

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
        multipartHttpServletRequest.getFileMap();

        String stringForPathURI = String.format("src\\main\\resources\\static\\side-character-profile-pics\\%s",
                sideCharacter.getExternalId());
        try {
            if(file != null) {
                try {
                    final File folder = new File(stringForPathURI);
                    for ( File f : folder.listFiles()) {
                        if (!f.isDirectory()) {
                            f.delete();
                        }
                    }
                    String dir = new File(stringForPathURI).getAbsolutePath();
                    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                    String extension = FilenameUtils.getExtension(fileName);

                    if (!Stream.of(AvailableExtensions.values()).anyMatch(v -> v.name().toLowerCase().equals(extension.toLowerCase()))) {
                        return new ResponseEntity(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
                    }
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

    public ResponseEntity getAllBooks() {
        ModelMapper modelMapper = new ModelMapper();
        List<Book> booksFromDb = bookRepository.findAll(Sort.by(Sort.Direction.ASC, "bookOrder"));
        List<BookDTO> result = new ArrayList<>();
        booksFromDb.forEach(book -> {
            BookDTO bookDTO = modelMapper.map(book, BookDTO.class);
            result.add(bookDTO);
        });

        return new ResponseEntity(result, HttpStatus.OK);
    }
}