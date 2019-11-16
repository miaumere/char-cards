package com.meowmere.main.Entities.characters;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;

@Entity
@Table(name = "temperament")
public class Temperament {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column
    @Length(min = 0, max = 100)
    private Integer melancholic;

    @Column
    @Length(min = 0, max = 100)
    private Integer sanguine;

    @Column
    @Length(min = 0, max = 100)
    private Integer flegmatic;

    @Column
    @Length(min = 0, max = 100)
    private Integer choleric;

    @ManyToOne(fetch =  FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_id", unique = true)
    private Character character;


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
}
