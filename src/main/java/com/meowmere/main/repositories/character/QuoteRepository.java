package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.Quote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuoteRepository extends JpaRepository<Quote, Long> {
    @Query("SELECT q FROM Quote q WHERE q.character.externalId = :characterId order by q.id")
    List<Quote> getAllQuotesByCharacterId(@Param("characterId") Long externalId);
}
