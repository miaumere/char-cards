package com.meowmere.main.Repositories.character;

import com.meowmere.main.Entities.characters.Titles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TitlesRepository extends JpaRepository<Titles, Long> {
//    @Query("SELECT t FROM Titles WHERE t.title = :titleName")
//    Titles getTitleByName(@Param("titleName") String titleName);
}
