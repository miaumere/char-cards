package com.meowmere.main.entities.characters;

import com.meowmere.main.enums.RelationType;
import com.meowmere.main.enums.RelationshipType;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
public class Relation {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_id")
    public Character character;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_related_to_id")
    public Character relatedCharacter;

    @Column
    @Enumerated(EnumType.STRING)
    private RelationType type;

    @Column
    private Integer x;

    @Column
    private Integer y;

    @Column
    private Long relationDateStart;

    @Column
    private Long relationDateEnd;

    public Relation(){}

    public Relation(Character character, Character relatedCharacter, RelationType type, Integer x, Integer y, Long relationDateStart, Long relationDateEnd) {
        this.character = character;
        this.relatedCharacter = relatedCharacter;
        this.type = type;
        this.x = x;
        this.y = y;
        this.relationDateStart = relationDateStart;
        this.relationDateEnd = relationDateEnd;
    }


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

    public RelationType getType() {
        return type;
    }

    public void setType(RelationType type) {
        this.type = type;
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) {
        this.y = y;
    }

    public Long getRelationDateStart() {
        return relationDateStart;
    }

    public void setRelationDateStart(Long relationDateStart) {
        this.relationDateStart = relationDateStart;
    }

    public Long getRelationDateEnd() {
        return relationDateEnd;
    }

    public void setRelationDateEnd(Long relationDateEnd) {
        this.relationDateEnd = relationDateEnd;
    }


}
