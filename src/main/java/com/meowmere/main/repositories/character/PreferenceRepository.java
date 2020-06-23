package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.Preference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface PreferenceRepository  extends JpaRepository<Preference, Long> {
    @Query("SELECT p FROM Preference p WHERE p.character.externalId = :charId")
    ArrayList<Preference> getPreferencesForCharacter(@Param("charId") Long charId);
}
