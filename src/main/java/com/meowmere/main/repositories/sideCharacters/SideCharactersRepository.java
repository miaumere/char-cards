package com.meowmere.main.repositories.sideCharacters;

import com.meowmere.main.entities.sideCharacters.SideCharacter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SideCharactersRepository extends JpaRepository<SideCharacter, Long> {
    @Query("SELECT s FROM SideCharacter s WHERE s.archived = false ORDER BY s.externalId asc")
    List<SideCharacter> getNonArchivedSideCharacters();

    @Query("SELECT s FROM SideCharacter s " +
            "WHERE (:name is null or s.sideCharacterName like %:name%)"
    )List<SideCharacter> getMatchingSideCharacters(
            @Param("name") Optional<String> name
    );
}
