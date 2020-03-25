package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Long> {
    @Query("SELECT c FROM Character c WHERE c.archived = false ORDER BY c.charName")
    List<Character> getNonArchivedCharacters();

    @Query("SELECT c FROM Character c WHERE c.archived = false and c.externalId = :id")
    Character getNonArchivedCharacter(@Param("id") Long externalId);

    @Query("SELECT c FROM Character c WHERE c.relationships is empty")
    List<Character> getCharactersWithoutRelationsForSideChar();
}
