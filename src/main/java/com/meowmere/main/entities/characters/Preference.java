package com.meowmere.main.entities.characters;

import io.micrometer.core.lang.Nullable;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames ={"character_id","prefered_character_id"})})
public class Preference {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch =  FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_id")
    private Character character;

    @ManyToOne(fetch =  FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "prefered_character_id")
    private Character preferedCharacter;

    @Column
    @Length(min = 0, max = 100)
    @Nullable
    private int range;

    @Column(name="date_of_origin")
    @Nullable
    private Date dateOfOrigin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Character getCharacter() {
        return character;
    }

    public void setCharacter(Character character) {
        this.character = character;
    }

    public Character getPreferedCharacter() {
        return preferedCharacter;
    }

    public void setPreferedCharacter(Character preferedCharacter) {
        this.preferedCharacter = preferedCharacter;
    }

    public int getRange() {
        return range;
    }

    public void setRange(int range) {
        this.range = range;
    }

    public Date getDateOfOrigin() {
        return dateOfOrigin;
    }

    public void setDateOfOrigin(Date dateOfOrigin) {
        this.dateOfOrigin = dateOfOrigin;
    }
}
