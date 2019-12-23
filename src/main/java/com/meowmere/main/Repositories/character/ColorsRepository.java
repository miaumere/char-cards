package com.meowmere.main.Repositories.character;

import com.meowmere.main.Entities.characters.Colors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorsRepository extends JpaRepository<Colors, Long> {
    @Query("SELECT c FROM Colors c WHERE c.character.externalId = :externalId")
    Colors getColorsForCharacter(@Param("externalId") Long externalId);
}
