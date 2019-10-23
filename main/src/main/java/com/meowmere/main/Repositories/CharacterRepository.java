package com.meowmere.main.Repositories;
import com.meowmere.main.CharacterDTO;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CharacterRepository extends CrudRepository<CharacterDTO, Long> {
    List<com.meowmere.main.CharacterDTO> getCharacterByExternalId(Long externalId);

}