package com.meowmere.main.Repositories.character;

import com.meowmere.main.Entities.characters.Temperament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TemperamentRepository extends JpaRepository<Temperament, Long> {
    @Query("SELECT t FROM Temperament t WHERE t.character.externalId = :externalId")
    Temperament getTemperamentForCharacter(@Param("externalId") Long externalId);
}
