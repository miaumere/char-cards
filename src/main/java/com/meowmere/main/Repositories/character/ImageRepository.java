package com.meowmere.main.Repositories.character;

import com.meowmere.main.Entities.characters.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository  extends JpaRepository<Image, Long> {
}
