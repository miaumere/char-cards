package com.meowmere.main.entities.characters;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Entity
@Table(name = "temperament")
public class Temperament {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column
    private Integer melancholic;

    @Column
    private Integer sanguine;

    @Column
    private Integer flegmatic;

    @Column
    private Integer choleric;

    @ManyToOne(fetch =  FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_id", unique = true)
    private Character character;

    public Temperament() {}
    public Temperament(Integer melancholic,
                       Integer sanguine,
                       Integer flegmatic,
                       Integer choleric,
                       Character character) {
        this.melancholic = melancholic;
        this.sanguine = sanguine;
        this.flegmatic = flegmatic;
        this.choleric = choleric;
        this.character = character;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMelancholic() {
        return melancholic;
    }

    public void setMelancholic(Integer melancholic) {
        this.melancholic = melancholic;
    }

    public Integer getSanguine() {
        return sanguine;
    }

    public void setSanguine(Integer sanguine) {
        this.sanguine = sanguine;
    }

    public Integer getFlegmatic() {
        return flegmatic;
    }

    public void setFlegmatic(Integer flegmatic) {
        this.flegmatic = flegmatic;
    }

    public Integer getCholeric() {
        return choleric;
    }

    public void setCholeric(Integer choleric) {
        this.choleric = choleric;
    }

    public Character getCharacter() {
        return character;
    }

    public void setCharacter(Character character) {
        this.character = character;
    }
}
