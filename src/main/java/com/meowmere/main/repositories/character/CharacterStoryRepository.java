package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.CharacterStory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CharacterStoryRepository extends JpaRepository<CharacterStory, Long> {
    @Query("SELECT s FROM CharacterStory s WHERE s.character.externalId = :externalId ORDER BY s.indexOnList")
    List<CharacterStory> getStoriesForCharacter (@Param("externalId") Long externalId);
}
