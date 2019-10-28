package com.meowmere.main.Repositories;

import com.meowmere.main.Entities.SideCharacter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SideCharactersRepository extends JpaRepository<SideCharacter, Long> {
}
