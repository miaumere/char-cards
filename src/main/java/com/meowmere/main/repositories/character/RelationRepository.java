package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.Character;
import com.meowmere.main.entities.characters.Relation;
import com.meowmere.main.entities.characters.Relationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelationRepository extends JpaRepository<Relation, Long> {
    @Query("SELECT r FROM Relation r where r.character.externalId = :characterId order by r.relatedCharacter.charName")
    List<Relation> getRelationsForCharacter(@Param("characterId") Long characterId);

    @Query("SELECT r.relatedCharacter.externalId FROM Relation r where r.character.externalId = :characterId order by r.relatedCharacter.charName")
    List<Long> getRelatedPeopleIdsForCharacter(@Param("characterId") Long characterId);

//    @Query("SELECT r FROM Relationship r where r.relatedCharacter.externalId = :characterId and r.character.externalId = :relatedCharId order by r.relatedCharacter.charName")
//    Relationship getRelationshipsWhereCharIsRelatedTo(@Param("characterId") Long characterId, @Param("relatedCharId") Long relatedCharId);
}
