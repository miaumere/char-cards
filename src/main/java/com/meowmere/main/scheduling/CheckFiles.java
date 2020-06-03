package com.meowmere.main.scheduling;

import com.meowmere.main.entities.story.Page;
import com.meowmere.main.repositories.story.PageRepository;
import com.meowmere.main.utils.UtilsShared;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;
import java.util.stream.Stream;

@Component
public class CheckFiles {
    @Autowired
    private PageRepository pageRepository;

    protected final Logger log = Logger.getLogger(getClass().getName());

    @Scheduled(cron = "0 0 3 * * *")
    public void executeTask() throws IOException {
        String logsPath = UtilsShared.GetMainDir()+"logs";
        String storiesPath = UtilsShared.GetMainDir()+"stories";

        String separator = System.getProperty("file.separator");
        if(!logsPath.endsWith(separator)) {
            logsPath += separator;
        }
        if(!storiesPath.endsWith(separator)) {
            storiesPath += separator;
        }

        Path path= Paths.get(logsPath);
        if(!Files.exists(path)){
            new File(logsPath).mkdirs();
        }

        List<Page> pages = pageRepository.findAll();

        String pattern = "dd-MM-yyyy-HH.mm.ss";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String date = simpleDateFormat.format(new Date());
        String fileName = date + ".txt";

        ArrayList<String> msgs = new ArrayList<>();
        FileHandler fh = new FileHandler(logsPath + fileName);
        log.addHandler(fh);
        SimpleFormatter formatter = new SimpleFormatter();
        fh.setFormatter(formatter);
        PrintWriter writer = new PrintWriter(logsPath + fileName, "UTF-8");

        if(pages != null && pages.size() > 0) {
            for (Page page : pages) {
                try (Stream<Path> walk = Files.walk(Paths.get(storiesPath + page.getFileLocation()))) {
                } catch (IOException e) {
                    Paths.get(logsPath);
                    if(!Files.exists(path)){
                        new File(logsPath).mkdirs();
                    }
                    String msg = String.format("Nie znaleziono pliku %s", e.getMessage() + " " + LocalDateTime.now().toString());
                    msgs.add(msg);
                    log.info(msg);
                }
        }
            writer.println(msgs);
            writer.close();
            fh.close();
        }
    }

}
