package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.CharacterStory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterStoryRepository extends JpaRepository<CharacterStory, Long> {
}
