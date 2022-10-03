package com.meowmere.main.services;

import com.meowmere.main.dto.character.character.CharactersMenuDTO;
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
import com.meowmere.main.enums.StarringType;
import com.meowmere.main.repositories.character.CharacterRepository;
import com.meowmere.main.repositories.character.ImageRepository;
import com.meowmere.main.repositories.story.BookRepository;
import com.meowmere.main.repositories.story.ChapterRepository;
import com.meowmere.main.repositories.story.PageRepository;
import com.meowmere.main.repositories.story.StarringCharactersRepository;
import com.meowmere.main.requests.characters.stories.EditStarringCharacterRequest;
import com.meowmere.main.requests.story.chapters.ChapterRequest;
import com.meowmere.main.requests.story.chapters.ChapterVisibilityRequest;
import com.meowmere.main.utils.UtilsShared;
import org.apache.commons.io.FilenameUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
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

    String storiesPath = UtilsShared.GetMainDir()+"stories";

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
                chapterWithCharsDTO.setActionPlace(chapter.getActionPlace());
                chapterWithCharsDTO.setActionTime(chapter.getActionTime());
                chapterWithCharsDTO.setCreateDate(chapter.getCreateDate());
                chapterWithCharsDTO.setVisible(chapter.getVisible());

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

                        Character character = starringCharacter.getCharacter();

                        String profilePic = null;
                        Image image = imageRepository.getProfilePicForCharacter(character.getExternalId());
                        if(image != null) {
                            profilePic = UtilsShared.GetProfilePicBase64Code(image.getExtension(), image.getImage());

                        }

                        CharactersMenuDTO charactersMenuDTO = new CharactersMenuDTO(character, profilePic);

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
                Path path= Paths.get(storiesPath);
                if(!Files.exists(path)){
                    new File(storiesPath).mkdirs();
                }

                String separator = System.getProperty("file.separator");

                if(!storiesPath.endsWith(separator)) {
                    storiesPath += separator;
                }


                try (Stream<Path> walk = Files.walk(Paths.get(storiesPath))) {
                    List<String> allFilesInDir = walk.filter(Files::isRegularFile)
                            .map(x -> x.toString()).collect(Collectors.toList());

                    for (String fileInDir: allFilesInDir) {
                        if(Objects.equals(fileInDir, storiesPath + page.getFileLocation())) {
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

                Character character = starringCharacter.getCharacter();

                String profilePic = null;

                Image image = imageRepository.getProfilePicForCharacter(character.getExternalId());
                if(image != null) {
                    profilePic = UtilsShared.GetProfilePicBase64Code(image.getExtension(), image.getImage());
                }

                CharactersMenuDTO charactersMenuDTO = new CharactersMenuDTO(character, profilePic);


                dto.setCharacter(charactersMenuDTO);
                dto.setStarringType(starringCharacter.getStarringType().name());
                dto.setId(starringCharacter.getExternalId());

                starringCharacterDTOS.add(dto);
            }

        }
        return new ResponseEntity(starringCharacterDTOS, HttpStatus.OK);
    }

    public ResponseEntity upsertBook(BookDTO request) {
        Book book = request.getId() == null ?  new Book() : bookRepository.getOne(request.getId());
        book.setName(request.getName());
        book.setColor(request.getColor());
        book.setSymbol(request.getSymbol());
        book.setBookOrder(request.getBookOrder() == null ? bookRepository.count()+1 : request.getBookOrder());

        bookRepository.saveAndFlush(book);

        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity createPages(MultipartHttpServletRequest multipartHttpServletRequest, Long chapterId){
        Map<String, MultipartFile> allFiles = multipartHttpServletRequest.getFileMap();
        Chapter chapter = chapterRepository.getOne(chapterId);

        if(chapter == null) {
            return  new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Iterator it = allFiles.entrySet().iterator();
        while (it.hasNext()) {
            try {
                Map.Entry pair = (Map.Entry) it.next();

                MultipartFile file = (MultipartFile) pair.getValue();
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                String extension = FilenameUtils.getExtension(fileName);

                long fileSize = file.getSize();
                if (file == null || fileSize == 0) {
                    continue;
                }


                if (!Stream.of(AvailableExtensions.values()).anyMatch(v -> v.name().toLowerCase().equals(extension.toLowerCase()))) {
                    return new ResponseEntity(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
                }
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

                    Path path = Paths.get(storiesPath);
                    if (!Files.exists(path)) {
                        new File(storiesPath).mkdirs();
                    }

                    File fileToSave = new File(storiesPath, fileToSaveName);
                    FileOutputStream fos = new FileOutputStream(fileToSave);

                    fos.write(file.getBytes());
                    fos.close();

                    Page pageToSave = new Page();
                    pageToSave.setPageNumber(pageRepository.getPagesForChapter(chapterId).size());
                    pageToSave.setChapter(chapter);
                    pageToSave.setFileLocation(fileToSaveName);

                    pageRepository.saveAndFlush(pageToSave);


                it.remove();
            } catch (IOException e) {
            }

        }
        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity upsertChapter(ChapterRequest request) {
        Book book = bookRepository.getOne(request.getBookId());
        if(book == null) {
            return  new ResponseEntity("Nie istnieje szkicownik o podanym id.",HttpStatus.NOT_FOUND);
        }

        Chapter chapter = request.getId() == null ? new Chapter() : chapterRepository.getOne(request.getId());
            chapter.setBook(book);
            chapter.setChapterDesc(request.getChapterDesc());
            chapter.setName(request.getName());

            if(request.getId() == null) {
                chapter.setCreateDate(System.currentTimeMillis() / 1000L);
                chapter.setChapterNumber(chapterRepository.getChaptersForBook(request.getBookId()).size() + 1000);
            }

            chapter.setActionPlace(request.getActionPlace());
            chapter.setActionTime(request.getActionTime());

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
            ArrayList<Chapter> chapters = chapterRepository.getChaptersForBook(id);
            if(chapters.size() > 0) {
                return new ResponseEntity(HttpStatus.BAD_REQUEST);
            }

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
            Resource resource = resourceLoader.getResource("file:" + storiesPath);
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

    public ResponseEntity editBookOrder(ArrayList<Long> booksIds){
        List<Book> books = bookRepository.findAll();
        HashMap<Long, Long> booksFromDb = new HashMap<>();

        for (int i = 0; i < books.size() ; i++) {
            Book book = books.get(i);
            booksFromDb.put(book.getExternalId(), book.getBookOrder());
        }
        booksFromDb.forEach((key, value) -> {
            Book book = bookRepository.getOne(key);
            book.setBookOrder(value);
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
            chapter.setChapterNumber(9999 + i);
            chapterRepository.saveAndFlush(chapter);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity editPagesOrder(ArrayList<Long> pagesIds, Long chapterId){
        for (int i = 0; i < pagesIds.size() ; i++) {
            Page page = pageRepository.getOne(pagesIds.get(i));
            page.setPageNumber(i);
            pageRepository.saveAndFlush(page);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity changeChapterVisibility(ChapterVisibilityRequest request) {
        Chapter chapter = chapterRepository.getOne(request.getChapterId());
        if(chapter == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        chapter.setVisible(request.getVisibility());
        chapterRepository.saveAndFlush(chapter);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
