package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
    @Query("select t from Tag t where t.id in(select ct.tag.id from CharacterTag ct where ct.character.externalId = :charId)")
    List<Tag> getTagsForCharacter(@Param("charId") Long charId);

}
