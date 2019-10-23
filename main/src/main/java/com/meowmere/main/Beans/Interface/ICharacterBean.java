package com.meowmere.main;

import java.util.List;

public interface ICharacterBean {
    public List<CharacterDTO> getCharacter(Long externalId);
}