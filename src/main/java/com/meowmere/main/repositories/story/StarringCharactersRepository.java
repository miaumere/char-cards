package com.meowmere.main.repositories.story;

import com.meowmere.main.entities.story.StarringCharacters;
import com.meowmere.main.enums.StarringType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface StarringCharactersRepository  extends JpaRepository<StarringCharacters, Long> {

    @Query("SELECT s FROM StarringCharacters s WHERE s.chapter.externalId = :chapterId ORDER by s.starringType")
    ArrayList<StarringCharacters> getStarringCharactersByChapterId(@Param("chapterId") Long chapterId);

    @Query("SELECT s FROM StarringCharacters s WHERE s.character.externalId = :characterId")
    ArrayList<StarringCharacters> getStarringCharactersByCharacterId(@Param("characterId") Long characterId);

    @Query("SELECT s.starringType FROM StarringCharacters s WHERE s.character.externalId = :characterId AND s.chapter.externalId = :chapterId")
    StarringType getStarringCharacterTypeByChapterAndCharId(@Param("characterId") Long characterId, @Param("chapterId") Long chapterId);

}
