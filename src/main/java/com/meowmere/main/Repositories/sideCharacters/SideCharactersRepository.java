package com.meowmere.main.Repositories.sideCharacters;
import com.meowmere.main.Entities.sideCharacters.SideCharacter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SideCharactersRepository extends JpaRepository<SideCharacter, Long> {
}
