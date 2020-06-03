package com.meowmere.main.repositories.story;

import com.meowmere.main.entities.story.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ChapterRepository  extends JpaRepository<Chapter, Long> {
    @Query("SELECT c FROM Chapter c WHERE c.book.externalId = :bookId")
    ArrayList<Chapter> getChaptersForBook(@Param("bookId") Long bookId);
}
