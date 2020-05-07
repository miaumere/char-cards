package com.meowmere.main.repositories.story;

import com.meowmere.main.entities.story.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface PageRepository extends JpaRepository<Page, Long> {

    @Query("SELECT DISTINCT p FROM Page p " +
            "JOIN p.chapters c WHERE c.externalId = :chapterId")
    ArrayList<Page> getPagesForChapter(@Param("chapterId") Long chapterId);
}
