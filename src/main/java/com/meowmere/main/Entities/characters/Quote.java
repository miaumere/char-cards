package com.meowmere.main.Entities.characters;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Entity
@Table(name = "quote")
public class Quote {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column
    private String quote;

    @Column
    private String context;

    @ManyToOne(fetch =  FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_id")
    private Character character;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuote() {
        return quote;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public Character getCharacter() {
        return character;
    }

    public void setCharacter(Character character) {
        this.character = character;
    }
}
