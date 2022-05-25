package com.meowmere.main.dto.character.character;

import com.meowmere.main.entities.characters.Character;

public class CharactersMenuDTO {
    private Long id;
    private String fullName;
    private String pseudonym;

    private String characterType;
    private String profilePic;
    private Boolean archived;


    public CharactersMenuDTO() {
    }
    public CharactersMenuDTO(Character character, String profilePic) {
        this.id = character.externalId;
        this.fullName = character.getCharName() != null ? character.getCharName() : "?" + " " + character.getCharSurname() != null ? character.getCharSurname() : "?";
        this.profilePic = profilePic;
        this.characterType = character.getCharType().name();
        this.pseudonym = character.getPseudonim();
        this.archived = character.getArchived();

    }

    public String getFullName() {
        return fullName;
    }
    public String getProfilePic() {
        return profilePic;
    }
    public Long getId() {
        return id;
    }
    public String getPseudonym() {
        return pseudonym;
    }
    public String getCharacterType() {
        return characterType;
    }

    public Boolean getArchived() {
        return archived;
    }
}
