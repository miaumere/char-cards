package com.meowmere.main.repositories.character;

import com.meowmere.main.dto.statistics.NationalitiesStatisticsDTO;
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

    @Query("SELECT c FROM Character c WHERE c.archived = false and c.externalId = :id")
    Character getNonArchivedCharacter(@Param("id") Long externalId);

    @Query("SELECT count(c) FROM Character c WHERE c.gender = :gender")
    int getCharactersForGender(@Param("gender") Gender gender);

    @Query("select new com.meowmere.main.dto.statistics.NationalitiesStatisticsDTO(c.nationality, count(c)) " +
            "from Character c group by c.nationality")
    List<NationalitiesStatisticsDTO> getNationalitiesStatistics();

    @Query("SELECT count(c) FROM Character c WHERE c.charType = :type")
    int getCharTypeNumber(@Param("type") CharType type);

    @Query("select c.birthday from Character c where c.death is null and c.birthday is not null")
    List<Long> getCharactersBirthdays();

    @Query("select c from Character c, StarringCharacters sc " +
            "where c.externalId = sc.character.externalId and sc.starringType = 'MAIN' group by c.externalId " +
            "having count(c)>3")
    List<Character> getCharsWithEnoughChaptersToBeMain();

    @Query("select c from Character c, StarringCharacters sc " +
            "where c.externalId = sc.character.externalId and sc.starringType = 'SIDE' group by c.externalId " +
            "having count(c) > 3")
    List<Character> getCharsWithEnoughChaptersToBeSide();
}
