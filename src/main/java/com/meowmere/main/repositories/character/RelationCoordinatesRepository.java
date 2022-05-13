package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.Relation;
import com.meowmere.main.entities.characters.RelationCoordinates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.LinkedHashSet;
import java.util.List;

@Repository
public interface RelationCoordinatesRepository extends JpaRepository<RelationCoordinates, Long> {
    @Query("SELECT r FROM RelationCoordinates r where r.sourceCharacter.externalId = :characterId or r.targetCharacter.externalId = :characterId")
    List<RelationCoordinates> getCoordinatesForCharacter(@Param("characterId") Long characterId);

    @Query("SELECT r FROM RelationCoordinates r where " +
            "r.sourceCharacter.externalId = :firstCharacterId " +
            "or r.targetCharacter.externalId = :firstCharacterId " +
            "and r.sourceCharacter.externalId = :secondCharacterId " +
            "or r.targetCharacter.externalId = :secondCharacterId"
    )
    List<RelationCoordinates> getCoordinatesForBoth(@Param("firstCharacterId") Long firstCharacterId, @Param("secondCharacterId") Long secondCharacterId);
}
