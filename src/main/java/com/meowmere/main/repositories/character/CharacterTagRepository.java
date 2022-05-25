package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.CharacterTag;
import com.meowmere.main.entities.characters.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterTagRepository extends JpaRepository<CharacterTag, Long> {
}
