package com.meowmere.main.entities.relationships;

import com.meowmere.main.entities.characters.Character;
import com.meowmere.main.entities.sideCharacters.SideCharacter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Entity
@Table(name = "relationship")
public class Relationship {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    public Long id;

    @Column
    public String relationType;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_id", unique = true)
    public Character character;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "side_character_id", unique = true)
    public SideCharacter sideCharacter;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRelationType() {
        return relationType;
    }

    public void setRelationType(String relationType) {
        this.relationType = relationType;
    }

    public Character getCharacter() {
        return character;
    }

    public void setCharacter(Character character) {
        this.character = character;
    }

    public SideCharacter getSideCharacter() {
        return sideCharacter;
    }

    public void setSideCharacter(SideCharacter sideCharacter) {
        this.sideCharacter = sideCharacter;
    }
}
