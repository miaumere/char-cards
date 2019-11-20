package com.meowmere.main.Repositories.characters;

import com.meowmere.main.Entities.characters.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoryRepository  extends JpaRepository<Story, Long> {
}
