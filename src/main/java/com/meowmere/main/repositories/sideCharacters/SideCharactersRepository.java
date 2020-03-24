package com.meowmere.main.repositories.sideCharacters;

import com.meowmere.main.entities.sideCharacters.SideCharacter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SideCharactersRepository extends JpaRepository<SideCharacter, Long> {
    @Query("SELECT s FROM SideCharacter s WHERE s.archived = false ORDER BY s.sideCharacterName")
    List<SideCharacter> getNonArchivedSideCharacters();


//
//    @Query("SELECT s FROM SideCharacter s " +
//            "INNER JOIN Relationship r on  r.character.externalId = :relatedTo " +
//            "WHERE (:relatedTo is not null AND exists " +
//            "(SELECT r from Relationship r WHERE r.character.externalId = :relatedTo) OR :relatedTo is null) " +
//            "AND ((:name is null or s.sideCharacterName like %:name%) " +
//            "OR s.sideCharacterSurname like %:name% )"
////            "OR (:relatedTo is null or s.relationships.character.externalId = :relatedTo)"
//    )List<SideCharacter> getMatchingSideCharacters(
//            @Param("name") Optional<String> name,
//            @Param("relatedTo") Optional<Long> relatedTo
//    );
}
