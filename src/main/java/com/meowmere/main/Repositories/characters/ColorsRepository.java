package com.meowmere.main.Repositories.characters;

import com.meowmere.main.Entities.characters.Colors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorsRepository extends JpaRepository<Colors, Long> {
}
