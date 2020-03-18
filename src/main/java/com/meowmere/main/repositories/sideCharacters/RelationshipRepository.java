package com.meowmere.main.repositories.sideCharacters;

import com.meowmere.main.entities.relationships.Relationship;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RelationshipRepository {
    @Query("SELECT r FROM Relationship r " +
            "WHERE r.sideCharacter = :id"
    )List<Relationship> getRelationshipsForSideCharacter(
            @Param("name") Optional<String> name
    );

}
