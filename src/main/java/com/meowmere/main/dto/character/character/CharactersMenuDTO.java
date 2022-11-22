package com.meowmere.main.dto.character.character;

import com.meowmere.main.dto.character.tags.TagDTO;
import com.meowmere.main.entities.characters.Character;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
public class CharactersMenuDTO {
    @Getter
    private Long id;
    @Getter
    private String fullName;
    @Getter
    private String pseudonym;
    @Getter
    private String characterType;
    @Getter
    private String profilePic;
    @Getter
    private Boolean archived;
    @Getter
    private Long birthday;

    @Getter
    @Setter
    private List<TagDTO> tags;


    public CharactersMenuDTO(Character character, String profilePic) {
        this.id = character.externalId;
        String name = character.getCharName() != null ? character.getCharName() : "?";
        String surname = character.getCharSurname() != null ? character.getCharSurname() : "";
        this.fullName = name + " " + surname;
        this.profilePic = profilePic;
        this.characterType = character.getCharType().name();
        this.pseudonym = character.getPseudonim();
        this.archived = character.getArchived();
        this.birthday = character.getBirthday();
    }


}
