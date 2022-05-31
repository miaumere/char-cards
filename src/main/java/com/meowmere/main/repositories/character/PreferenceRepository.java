package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.Preference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;

@Repository
public interface PreferenceRepository  extends JpaRepository<Preference, Long> {
    @Query("SELECT p FROM Preference p WHERE p.character.externalId = :charId order by p.dateOfOrigin desc")
    ArrayList<Preference> getPreferencesForCharacter(@Param("charId") Long charId);

    @Query("SELECT p FROM Preference p WHERE p.character.externalId = :charId " +
            "and p.preferedCharacter.externalId = :preferedCharacter " +
            "order by p.dateOfOrigin asc")
    ArrayList<Preference> getHistoricalPreferences(@Param("charId") Long charId, @Param("preferedCharacter") Long preferedCharacter);


    @Query("SELECT DISTINCT p.preferedCharacter.externalId from Preference p where p.character.externalId = :charId")
    ArrayList<Long> getRelatedCharsIds(@Param("charId") Long charId);

    @Query("SELECT p from Preference p where p.character.externalId = :charId " +
            "and p.preferedCharacter.externalId = :relatedCharId " +
            "and p.dateOfOrigin = :dateOfPreference")
    Preference getPreferenceByCharIdRelatedCharIdDate(
            @Param("charId") Long charId,
            @Param("relatedCharId") Long relatedCharId,
            @Param("dateOfPreference") Date dateOfPreference
    );

    @Query("SELECT p from Preference p where p.character.externalId = :charId " +
            "and p.preferedCharacter.externalId = :relatedCharId " +
            "and p.dateOfOrigin is null")
    Preference getCurrentPrefByCharIdRelatedCharId(
            @Param("charId") Long charId,
            @Param("relatedCharId") Long relatedCharId
    );

    @Query("SELECT p from Preference p where p.character.externalId = :charId " +
            "and p.preferedCharacter.externalId = :relatedCharId and p.dateOfOrigin is null")
    Preference getCurrentPreferenceForCharacters(@Param("charId") Long charId,
                                      @Param("relatedCharId") Long relatedCharId);

    @Query("SELECT p FROM Preference p WHERE p.character.externalId = :charId or p.preferedCharacter.externalId = :charId")
    ArrayList<Preference> getAllPreferencesForCharacter(@Param("charId") Long charId);

}
