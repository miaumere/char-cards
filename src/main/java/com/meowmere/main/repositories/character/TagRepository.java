package com.meowmere.main.repositories.character;

import com.meowmere.main.entities.characters.Image;
import com.meowmere.main.entities.characters.Relation;
import com.meowmere.main.entities.characters.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {

}
