package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.Relationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelationshipRepository extends JpaRepository<Relationship, Long> {
    @Query("SELECT r FROM Relationship r where r.character.externalId = :characterId")
    List<Relationship> getRelationshipsForCharacter(@Param("characterId") Long characterId);
}
