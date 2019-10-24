package com.meowmere.main;

import com.meowmere.main.Entities.Character;

import java.util.List;

public interface ICharacterBean {
    public List<Character> getCharacter(Long externalId);
}