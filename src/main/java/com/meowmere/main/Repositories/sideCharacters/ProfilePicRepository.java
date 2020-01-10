package com.meowmere.main.Repositories.sideCharacters;

import com.meowmere.main.Entities.sideCharacters.ProfilePic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfilePicRepository extends JpaRepository<ProfilePic, Long> {
    @Query("SELECT p FROM ProfilePic p WHERE p.sideCharacter.id = :externalId")
    ProfilePic getProfilePicForCharacter(@Param("externalId") Long externalId);
}
