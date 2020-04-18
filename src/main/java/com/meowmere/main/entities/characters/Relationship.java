package com.meowmere.main.entities.characters;

import com.meowmere.main.enums.RelationshipType;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Entity
@Table
public class Relationship {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_id")
    private Character character;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "related_character_id")
    private Character relatedCharacter;

    @Column
    @Enumerated(EnumType.STRING)
    private RelationshipType relationName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Character getCharacter() {
        return character;
    }

    public void setCharacter(Character character) {
        this.character = character;
    }

    public Character getRelatedCharacter() {
        return relatedCharacter;
    }

    public void setRelatedCharacter(Character relatedCharacter) {
        this.relatedCharacter = relatedCharacter;
    }

    public RelationshipType getRelationName() {
        return relationName;
    }

    public void setRelationName(RelationshipType relationName) {
        this.relationName = relationName;
    }
}
