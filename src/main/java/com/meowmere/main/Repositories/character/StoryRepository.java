package com.meowmere.main.Repositories.character;

import com.meowmere.main.Entities.characters.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {
    @Query("SELECT s FROM Story s WHERE s.character.externalId = :characterId ORDER BY s.title.sequence asc")
    List<Story> getAllStoriesForCharacter(@Param("characterId") Long characterId);

    @Query("SELECT s FROM Story s WHERE s.character.externalId = :characterId AND s.title.id = :titleId")
    Story getStoryForCharacterAndTitle(@Param("characterId") Long characterId, @Param("titleId") Long titleId);
}
