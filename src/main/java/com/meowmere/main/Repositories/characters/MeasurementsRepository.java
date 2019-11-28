package com.meowmere.main.Repositories.characters;

import com.meowmere.main.Entities.characters.Measurements;
import com.meowmere.main.Entities.characters.Quote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeasurementsRepository extends JpaRepository<Measurements, Long> {
    @Query("SELECT q FROM Quote q WHERE q.character.externalId = :characterId")
    List<Quote> getAllQuotesById(@Param("characterId") Long externalId);
}
