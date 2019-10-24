package com.meowmere.main.Repositories;
import com.meowmere.main.Entities.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface CharacterRepository extends JpaRepository<Character, Long> {
}
