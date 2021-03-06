package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository  extends JpaRepository<Image, Long> {
    @Query("SELECT i FROM Image i WHERE i.character.externalId = :externalId AND i.isProfilePic = true")
    Image getProfilePicForCharacter(@Param("externalId") Long externalId);

    @Query("SELECT i FROM Image i WHERE i.character.externalId = :externalId AND i.isProfilePic = false ORDER BY i.imageOrder asc")
    List<Image> getImagesForCharacter(@Param("externalId") Long externalId);
}
