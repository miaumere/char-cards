package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.Measurements;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MeasurementsRepository extends JpaRepository<Measurements, Long> {
    @Query("SELECT m FROM Measurements m WHERE m.character.externalId = :externalId")
    Measurements getMeasurementsById(@Param("externalId") Long externalId);
}
