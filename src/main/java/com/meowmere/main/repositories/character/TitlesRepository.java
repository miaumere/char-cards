package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.Titles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TitlesRepository extends JpaRepository<Titles, Long> {
}
