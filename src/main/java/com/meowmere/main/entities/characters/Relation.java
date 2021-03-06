package com.meowmere.main.entities.characters;

import com.meowmere.main.enums.RelationType;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames ={"character_id","character_related_to_id", "type", "relation_date_start", "relation_date_end"})})
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

    @Column(name = "relation_date_start")
    @ColumnDefault("0")
    private Long relationDateStart = new Long(0);

    @Column(name = "relation_date_end")
    @ColumnDefault("0")
    private Long relationDateEnd = new Long(0);

    public Relation(){}

    public Relation(Character character, Character relatedCharacter, RelationType type, Long relationDateStart, Long relationDateEnd) {
        this.character = character;
        this.relatedCharacter = relatedCharacter;
        this.type = type;
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
