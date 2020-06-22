package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.Preference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreferenceRepository  extends JpaRepository<Preference, Long> {
}
