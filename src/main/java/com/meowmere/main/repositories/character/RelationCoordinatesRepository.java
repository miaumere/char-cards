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
    @Query("SELECT r FROM RelationCoordinates r where r.sourceCharacter.externalId = :characterId and r.targetCharacter.externalId IN (:relatedCharactersList)")
    List<RelationCoordinates> getCoordinatesInCharacterRelationTree(@Param("characterId") Long characterId, @Param("relatedCharactersList") List<Long> relatedCharactersList);

    @Query("SELECT r FROM RelationCoordinates r where r.sourceCharacter.externalId = :characterId or r.targetCharacter.externalId  = :characterId ")
    List<RelationCoordinates> getAllRelationsForCharacter(@Param("characterId") Long characterId);


    @Query("SELECT r FROM RelationCoordinates r where r.sourceCharacter.externalId = :characterId and r.targetCharacter.externalId = :relatedCharacterId")
    RelationCoordinates getCoordinatesForCharacterAndRelatedCharacter(@Param("characterId") Long characterId, @Param("relatedCharacterId") Long relatedCharacterId);

    @Query("SELECT r FROM RelationCoordinates r where r.sourceCharacter.externalId = :characterId or r.targetCharacter.externalId = :characterId")
    List<RelationCoordinates> getAllCoordinatesForCharacter(@Param("characterId") Long characterId);
}