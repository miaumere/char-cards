package com.meowmere.main.Repositories;
import com.meowmere.main.Entities.SideCharacter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SideCharactersRepository extends JpaRepository<SideCharacter, Long> {
}
