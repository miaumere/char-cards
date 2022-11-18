package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.Character;
import com.meowmere.main.enums.CharType;
import com.meowmere.main.enums.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Long> {
    @Query("SELECT c FROM Character c WHERE c.archived = false ORDER BY c.charName")
    List<Character> getNonArchivedCharacters();

    @Query("SELECT c FROM Character c ORDER BY  c.archived, c.charName, c.charType")
    List<Character> getSortedCharacters();

    @Query("SELECT count(c) FROM Character c WHERE c.gender = :gender")
    int getCharactersForGender(@Param("gender") Gender gender);

}
