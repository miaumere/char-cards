package com.meowmere.main.Repositories.characters;

import com.meowmere.main.Entities.characters.Temperament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemperamentRepository extends JpaRepository<Temperament, Long> {
}
