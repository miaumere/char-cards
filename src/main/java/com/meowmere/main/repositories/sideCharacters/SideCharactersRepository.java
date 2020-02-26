package com.meowmere.main.repositories.sideCharacters;

import com.meowmere.main.entities.sideCharacters.SideCharacter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SideCharactersRepository extends JpaRepository<SideCharacter, Long> {
    @Query("SELECT s FROM SideCharacter s WHERE s.archived = false ORDER BY s.externalId asc")
    List<SideCharacter> getNonArchivedSideCharacters();
}
