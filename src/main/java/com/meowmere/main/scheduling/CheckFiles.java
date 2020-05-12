package com.meowmere.main.scheduling;

import com.meowmere.main.entities.story.Page;
import com.meowmere.main.repositories.story.PageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;
import java.util.stream.Stream;

@Component
public class CheckFiles {
    @Value("${alea.storyLocation}")
    private String aleaStoryLocation;
    @Autowired
    private PageRepository pageRepository;

    protected final Logger log = Logger.getLogger(getClass().getName()); //java.util.logging.Logger
    private final String pathName = "/errors/errors.txt";

    @Scheduled(cron = "0 0 3 * * *")
    public void executeTask() throws IOException {
        List<Page> pages = pageRepository.findAll();
        if(pages != null && pages.size() > 0) {
            for (Page page : pages) {
                try (Stream<Path> walk = Files.walk(Paths.get(aleaStoryLocation + page.getFileLocation()))) {
                } catch (IOException e) {
                    FileHandler fh = new FileHandler(aleaStoryLocation + pathName);
                    log.addHandler(fh);
                    SimpleFormatter formatter = new SimpleFormatter();
                    fh.setFormatter(formatter);
                    String msg = String.format("Nie znaleziono pliku %s", e.getMessage() + " " + LocalDateTime.now().toString());
                    log.info(msg);

                }
        }
        }
    }

}
