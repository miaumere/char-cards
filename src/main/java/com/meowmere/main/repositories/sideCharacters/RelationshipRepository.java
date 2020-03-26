package com.meowmere.main.repositories.sideCharacters;

import com.meowmere.main.entities.relationships.Relationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelationshipRepository extends JpaRepository<Relationship, Long> {
    //select side_character_id from relationship where character_id = 1;

    @Query("SELECT r FROM Relationship r WHERE r.character.externalId = :toCharId")
    List<Object> getRelationCharacterIds(@Param("toCharId") Long toCharId);


    @Query("SELECT r FROM Relationship r WHERE r.sideCharacter.externalId=:sideCharId ORDER BY r.character.charName")
    List<Relationship> getRelationsForSideCharacter(@Param("sideCharId") Long toCharId);


    @Query("SELECT r FROM Relationship r " +
            "LEFT JOIN r.sideCharacter.books b " +
            "WHERE r.character.externalId=?1 " +
            "AND UPPER(CONCAT(r.sideCharacter.sideCharacterName, ' ', r.sideCharacter.sideCharacterSurname)) LIKE UPPER(concat('%',?2,'%'))" +
            "AND b.externalId in (?3)")
    List<Relationship> getFilteredRelationsByCharIdNameAndBooks(Long relatedTo, String name, List<Long> bookIdsRequired);




}
