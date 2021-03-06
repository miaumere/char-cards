package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.Relation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.LinkedHashSet;
import java.util.List;

@Repository
public interface RelationRepository extends JpaRepository<Relation, Long> {
    @Query("SELECT r FROM Relation r where r.character.externalId = :characterId or r.relatedCharacter.externalId = :characterId " +
            "order by r.relatedCharacter.charName")
    List<Relation> getRelationsForCharacter(@Param("characterId") Long characterId);

    @Query("SELECT r.relatedCharacter.externalId FROM Relation r where r.character.externalId = :characterId order by r.relatedCharacter.charName")
    LinkedHashSet<Long> getRelatedPeopleIdsForCharacter(@Param("characterId") Long characterId);

    @Query("SELECT r FROM Relation r where r.character.externalId = :characterId and r.relatedCharacter.externalId = :relatedCharacterId")
    List<Relation> getRelationsForBoth(@Param("characterId") Long characterId, @Param("relatedCharacterId") Long relatedCharacterId);

    @Query("SELECT r FROM Relation r where r.id = :id")
    Relation getRelationById(@Param("id") Integer relationId);



}
