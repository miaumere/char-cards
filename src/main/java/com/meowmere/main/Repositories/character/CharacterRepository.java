package com.meowmere.main.Repositories.character;

import com.meowmere.main.Entities.characters.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Long> {
    @Query("SELECT c FROM Character c WHERE c.archived = false ORDER BY c.externalId asc")
    List<Character> getNonArchivedCharacters();

}
