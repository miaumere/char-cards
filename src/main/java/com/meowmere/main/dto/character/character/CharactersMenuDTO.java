package com.meowmere.main.dto.character.character;

import com.meowmere.main.entities.characters.Character;

public class CharactersMenuDTO {
    private Long id;
    private String fullName;
    private String pseudonym;

    private String characterType;
    private String profilePic;
    private Boolean archived;
    private Long birthday;


    public CharactersMenuDTO() {
    }
    public CharactersMenuDTO(Character character, String profilePic) {
        this.id = character.externalId;
        String name = character.getCharName() != null ? character.getCharName() : "?";
        String surname =  character.getCharSurname() != null ? character.getCharSurname() : "?";
        this.fullName = name + " " + surname;
        this.profilePic = profilePic;
        this.characterType = character.getCharType().name();
        this.pseudonym = character.getPseudonim();
        this.archived = character.getArchived();
        this.birthday = character.getBirthday();
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
    public Long getBirthday() {
        return birthday;
    }

}
