package com.meowmere.main.services.story;

import com.meowmere.main.dto.character.character.CharactersMenuDTO;
import com.meowmere.main.dto.character.image.ProfilePicForMainDTO;
import com.meowmere.main.dto.story.books.BookDTO;
import com.meowmere.main.dto.story.chapters.ChapterDTO;
import com.meowmere.main.dto.story.chapters.ChapterWithCharsDTO;
import com.meowmere.main.dto.story.starring.StarringCharacterDTO;
import com.meowmere.main.entities.characters.Character;
import com.meowmere.main.entities.characters.Image;
import com.meowmere.main.entities.story.Book;
import com.meowmere.main.entities.story.Chapter;
import com.meowmere.main.entities.story.Page;
import com.meowmere.main.entities.story.StarringCharacters;
import com.meowmere.main.enums.AvailableExtensions;
import com.meowmere.main.enums.AvailableIcon;
import com.meowmere.main.enums.StarringType;
import com.meowmere.main.repositories.character.CharacterRepository;
import com.meowmere.main.repositories.character.ImageRepository;
import com.meowmere.main.repositories.story.BookRepository;
import com.meowmere.main.repositories.story.ChapterRepository;
import com.meowmere.main.repositories.story.PageRepository;
import com.meowmere.main.repositories.story.StarringCharactersRepository;
import com.meowmere.main.requests.characters.stories.EditStarringCharacterRequest;
import com.meowmere.main.requests.story.books.CreateBookRequest;
import com.meowmere.main.requests.story.books.EditBookRequest;
import com.meowmere.main.requests.story.chapters.ChapterRequest;
import org.apache.commons.io.FilenameUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class StoryService {
    @Autowired
    BookRepository bookRepository;
    @Autowired
    ChapterRepository chapterRepository;
    @Autowired
    PageRepository pageRepository;
    @Autowired
    ResourceLoader resourceLoader;
    @Autowired
    StarringCharactersRepository starringCharactersRepository;
    @Autowired
    ImageRepository imageRepository;
    @Autowired
    CharacterRepository characterRepository;
    @Value("${alea.storyLocation}")
    private String aleaStoryLocation;

    public ResponseEntity getBooks() {
        ModelMapper modelMapper = new ModelMapper();
        List<Book> books = bookRepository.findAll(Sort.by(Sort.Direction.ASC, "bookOrder"));
        ArrayList<BookDTO> bookDTOS = new ArrayList<>();
        if(books != null) {
            for (Book book: books) {
                BookDTO bookDTO = modelMapper.map(book, BookDTO.class);
                bookDTOS.add(bookDTO);
            }
        }
        return new ResponseEntity(bookDTOS, HttpStatus.OK);
    }

    public ResponseEntity getChaptersForBook(Long bookId) {
        ArrayList<Chapter> chapters = chapterRepository.getChaptersForBook(bookId);
        ArrayList<ChapterDTO> chapterDTOS = new ArrayList<>();
        if(chapters != null) {
            ModelMapper modelMapper = new ModelMapper();
            for (Chapter chapter: chapters) {
            ChapterDTO chapterDTO = modelMapper.map(chapter, ChapterDTO.class);
            ArrayList<Long> pagesIds = new ArrayList<>();
            ArrayList<Page> pages = pageRepository.getPagesForChapter(chapter.getExternalId());
                for (Page page : pages) {
                    pagesIds.add(page.getId());
                }
            chapterDTO.setPagesIds(pagesIds);
            chapterDTOS.add(chapterDTO);
            }
        }

        return new ResponseEntity(chapterDTOS, HttpStatus.OK);
    }

    public ResponseEntity getChaptersWithCharactersForBook(Long bookId) {
        ArrayList<ChapterWithCharsDTO> chapterWithCharsDTOS = new ArrayList<>();
        ArrayList<Chapter> chapters = chapterRepository.getChaptersForBook(bookId);
        if(chapters != null) {
            ModelMapper modelMapper = new ModelMapper();
            for (Chapter chapter: chapters) {
                ChapterWithCharsDTO chapterWithCharsDTO = modelMapper.map(chapter, ChapterWithCharsDTO.class);
                ArrayList<Long> pagesIds = new ArrayList<>();
                ArrayList<Page> pages = pageRepository.getPagesForChapter(chapter.getExternalId());
                for (Page page : pages) {
                    pagesIds.add(page.getId());
                }
                chapterWithCharsDTO.setPagesIds(pagesIds);
                chapterWithCharsDTOS.add(chapterWithCharsDTO);

                ArrayList<StarringCharacters> starringCharacters = starringCharactersRepository
                        .getStarringCharactersByChapterId(chapter.getExternalId());
                ArrayList<StarringCharacterDTO> characterDTOS = new ArrayList<>();

                if(starringCharacters != null && starringCharacters.size() > 0) {
                    for (StarringCharacters starringCharacter : starringCharacters) {
                        StarringCharacterDTO dto = new StarringCharacterDTO();

                        CharactersMenuDTO charactersMenuDTO = new CharactersMenuDTO();
                        Character character = starringCharacter.getCharacter();

                        charactersMenuDTO.setId(character.getExternalId());
                        charactersMenuDTO.setCharacterType(character.getCharType().name());
                        charactersMenuDTO.setCharName(character.getCharName());
                        charactersMenuDTO.setCharSurname(character.getCharSurname());

                        ProfilePicForMainDTO profilePicForMainDTO = new ProfilePicForMainDTO();

                        Image image = imageRepository.getProfilePicForCharacter(character.getExternalId());
                        if(image != null) {
                            profilePicForMainDTO.setImage(image.getImage());
                            profilePicForMainDTO.setExtension(image.getExtension());
                            charactersMenuDTO.setProfilePic(profilePicForMainDTO);
                        }

                        dto.setCharacter(charactersMenuDTO);
                        dto.setStarringType(starringCharacter.getStarringType().name());
                        dto.setId(starringCharacter.getExternalId());

                        characterDTOS.add(dto);
                    }
                    chapterWithCharsDTO.setStarringChars(characterDTOS);


                }
            }
        }

        return new ResponseEntity(chapterWithCharsDTOS, HttpStatus.OK);
    }

    public ResponseEntity getPagesForChapter(Long chapterId, Integer pageNumber) {
        byte[] bytes = new byte[]{};
            Page page = pageRepository.getPageByPageNumber(pageNumber, chapterId);
            if(page != null) {
                try (Stream<Path> walk = Files.walk(Paths.get(aleaStoryLocation))) {
                    List<String> allFilesInDir = walk.filter(Files::isRegularFile)
                            .map(x -> x.toString()).collect(Collectors.toList());

                    for (String fileInDir: allFilesInDir) {
                        if(Objects.equals(fileInDir, aleaStoryLocation + page.getFileLocation())) {
                            File image = new File(fileInDir);
                            bytes = FileCopyUtils.copyToByteArray(image);
                        }
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }


        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity(bytes, httpHeaders, HttpStatus.OK);
    }

    public ResponseEntity getStarringCharactersForChapter(Long chapterId) {
        ArrayList<StarringCharacters> starringCharacters = starringCharactersRepository.getStarringCharactersByChapterId(chapterId);
        ArrayList<StarringCharacterDTO> starringCharacterDTOS = new ArrayList<>();
        if(starringCharacters != null && starringCharacters.size() > 0) {
            for (StarringCharacters starringCharacter : starringCharacters) {
                StarringCharacterDTO dto = new StarringCharacterDTO();

                CharactersMenuDTO charactersMenuDTO = new CharactersMenuDTO();
                Character character = starringCharacter.getCharacter();

                charactersMenuDTO.setId(character.getExternalId());
                charactersMenuDTO.setCharacterType(character.getCharType().name());
                charactersMenuDTO.setCharName(character.getCharName());
                charactersMenuDTO.setCharSurname(character.getCharSurname());

                ProfilePicForMainDTO profilePicForMainDTO = new ProfilePicForMainDTO();

                Image image = imageRepository.getProfilePicForCharacter(character.getExternalId());
                if(image != null) {
                    profilePicForMainDTO.setImage(image.getImage());
                    profilePicForMainDTO.setExtension(image.getExtension());
                    charactersMenuDTO.setProfilePic(profilePicForMainDTO);
                }

                dto.setCharacter(charactersMenuDTO);
                dto.setStarringType(starringCharacter.getStarringType().name());
                dto.setId(starringCharacter.getExternalId());

                starringCharacterDTOS.add(dto);
            }

        }
        return new ResponseEntity(starringCharacterDTOS, HttpStatus.OK);
    }

    public ResponseEntity createBook(CreateBookRequest request) {
        Book book = new Book();
        Long booksNumber = bookRepository.count();
        book.setBookOrder(booksNumber+1);
        book.setColor(request.getColor());
        book.setName(request.getName());
        if(request.getIcon() != null) {
            book.setIcon(AvailableIcon.valueOf(request.getIcon()));
        }

        bookRepository.saveAndFlush(book);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity createPages(MultipartHttpServletRequest multipartHttpServletRequest, Long chapterId){
        Map<String, MultipartFile> allFiles = multipartHttpServletRequest.getFileMap();
        Chapter chapter = chapterRepository.getOne(chapterId);
        if(chapter == null) {
            return  new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Iterator it = allFiles.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry)it.next();


            MultipartFile file = (MultipartFile) pair.getValue();
            if(file != null) {
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                String extension = FilenameUtils.getExtension(fileName);
                if (!Stream.of(AvailableExtensions.values()).anyMatch(v -> v.name().toLowerCase().equals(extension.toLowerCase()))) {
                    return new ResponseEntity(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
                }
                try {
                    byte [] byteArr = file.getBytes();
                    UUID uuid = UUID.randomUUID();

                    int leftLimit = 97; // 'a'
                    int rightLimit = 122; // 'z'
                    int targetStringLength = 10;
                    Random random = new Random();

                    String generatedString = random.ints(leftLimit, rightLimit + 1)
                            .limit(targetStringLength)
                            .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                            .toString();

                    String fileToSaveName = generatedString + uuid + "." + extension;




                    File fileToSave = new File(aleaStoryLocation, fileToSaveName);
                    FileOutputStream fos = new FileOutputStream(fileToSave);
                    fos.write(byteArr);
                    fos.close();

                    Page pageToSave = new Page();
                    pageToSave.setPageNumber(pageRepository.getPagesForChapter(chapterId).size()+1);
                    pageToSave.setChapter(chapter);
                    pageToSave.setFileLocation(fileToSaveName);

                    pageRepository.saveAndFlush(pageToSave);
                } catch (IOException e) {}

                it.remove();
            }}



        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity editChapter(ChapterRequest request) {
        Book book = bookRepository.getOne(request.getBookId());
        if(book == null) {
            return  new ResponseEntity("Nie istnieje szkicownik o podanym id.",HttpStatus.NOT_FOUND);
        }
        if(request.getId() == null) {
            Chapter chapter = new Chapter();
            chapter.setBook(book);
            chapter.setChapterDesc(request.getChapterDesc());
            chapter.setName(request.getName());

            Integer chaptersForBookSize = chapterRepository.getChaptersForBook(request.getBookId()).size();
            chapter.setChapterNumber(chaptersForBookSize);

            chapterRepository.saveAndFlush(chapter);
            return new ResponseEntity(HttpStatus.CREATED);
        }
        Chapter chapter = chapterRepository.getOne(request.getId());
        if(chapter == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        chapter.setName(request.getName());
        chapter.setChapterDesc(request.getChapterDesc());
        chapterRepository.saveAndFlush(chapter);


        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity editStarringCharacters(EditStarringCharacterRequest request) {
        Chapter chapter = chapterRepository.getOne(request.getChapterId());
        if(chapter == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        if(request.getId() == null) {
            StarringCharacters starringCharacter = new StarringCharacters();
            Character character = characterRepository.getOne(request.getCharacterId());
            if(character == null) {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
            starringCharacter.setCharacter(character);
            starringCharacter.setChapter(chapter);
            starringCharacter.setStarringType(StarringType.valueOf(request.getStarringType()));
            starringCharactersRepository.saveAndFlush(starringCharacter);
        }



        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity deleteBook(Long id) {
        Book book = bookRepository.getOne(id);
        if(book != null) {
            bookRepository.delete(book);
        }
        return  new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity deleteChapter(Long id) {
        Chapter chapter = chapterRepository.getOne(id);
        if(chapter != null) {
            chapterRepository.delete(chapter);
        }
        return  new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity deletePage(Long pageId) {
        Page page = pageRepository.getOne(pageId);

        if(page != null) {
            Resource resource = resourceLoader.getResource("file:" + aleaStoryLocation);
        try {
            File file = resource.getFile();
            File[] images = file.listFiles();

            File image  = Arrays
                    .stream(images)
                    .filter(x -> Objects.equals(page.getFileLocation(), x.getName()))
                    .findFirst()
                    .orElse(null);

            image.delete();
            pageRepository.delete(page);

            ArrayList<Page> pagesFromDb = pageRepository.getPagesForChapter(page.getChapter().getExternalId());
            if(pagesFromDb.size() > 0) {
                for (int i = 0; i < pagesFromDb.size(); i++) {
                    pagesFromDb.get(i).setPageNumber(i);
                    pageRepository.saveAndFlush(pagesFromDb.get(i));
                }
            }
        } catch (IOException e) {
        }
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity deleteStarringCharacterFromChapter(Long id) {
        StarringCharacters starringCharacter = starringCharactersRepository.getOne(id);
        if (starringCharacter != null ) {
            starringCharactersRepository.delete(starringCharacter);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity editBook(EditBookRequest request) {
        Book book = bookRepository.getOne(request.getId());
        if (book == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        if(request.getIcon() != null) {
            book.setIcon(AvailableIcon.valueOf(request.getIcon()));
        }
        book.setName(request.getName());
        book.setColor(request.getColor());
        bookRepository.saveAndFlush(book);

        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity editBookOrder(ArrayList<Long> booksIds){
        List<Book> books = bookRepository.findAll();
        HashMap<Long, Long> booksFromDb = new HashMap<>();

        for (int i = 0; i < books.size() ; i++) {
            Book book = books.get(i);
            booksFromDb.put(book.getExternalId(), book.getBookOrder());
        }
        booksFromDb.forEach((key, value) -> {
            Book book = bookRepository.getOne(key);
            book.setBookOrder(9999 + value);
            bookRepository.saveAndFlush(book);
        });

        for (int i = 0; i < booksIds.size() ; i++) {
            Book book = bookRepository.getOne(booksIds.get(i));
            book.setBookOrder(Long.valueOf(i));
            bookRepository.saveAndFlush(book);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity editChapterOrder(ArrayList<Long> chapterIds, Long bookId){
        List<Chapter> chapters = chapterRepository.getChaptersForBook(bookId);
        HashMap<Long, Integer> booksFromDb = new HashMap<>();

        for (int i = 0; i < chapters.size() ; i++) {
            Chapter chapter = chapters.get(i);
            booksFromDb.put(chapter.getExternalId(), chapter.getChapterNumber());
        }
        booksFromDb.forEach((key, value) -> {
            Chapter chapter = chapterRepository.getOne(key);
            chapter.setChapterNumber(9999 + value);
            chapterRepository.saveAndFlush(chapter);
        });

        for (int i = 0; i < chapterIds.size() ; i++) {
            Chapter chapter = chapterRepository.getOne(chapterIds.get(i));
            chapter.setChapterNumber(i);
            chapterRepository.saveAndFlush(chapter);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity editPagesOrder(ArrayList<Long> pagesIds, Long chapterId){
        List<Page> pages = pageRepository.getPagesForChapter(chapterId);
        HashMap<Long, Integer> chaptersFromDb = new HashMap<>();

        for (int i = 0; i < pages.size() ; i++) {
            Page page = pages.get(i);
            chaptersFromDb.put(page.getId(), page.getPageNumber());
        }
        chaptersFromDb.forEach((key, value) -> {
            Page page = pageRepository.getOne(key);
            page.setPageNumber(9999 + value);
            pageRepository.saveAndFlush(page);
        });

        for (int i = 0; i < pagesIds.size() ; i++) {
            Page page = pageRepository.getOne(pagesIds.get(i));
            page.setPageNumber(i);
            pageRepository.saveAndFlush(page);
        }

        return new ResponseEntity(HttpStatus.OK);
    }
}
