package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.CharacterTag;
import com.meowmere.main.entities.characters.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CharacterTagRepository extends JpaRepository<CharacterTag, Integer> {

    @Query("select ct from CharacterTag ct where ct.character.externalId = :charId")
    List<CharacterTag> getCharacterTagsForCharacter(@Param("charId") Long charId);

    @Query("select ct from CharacterTag ct where ct.tag.id = :tagId")
    List<CharacterTag> getCharacterTagsForTag(@Param("tagId") Integer tagId);

}
