package com.meowmere.main.Entities.sideCharacters;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    public Long externalId;

    @Column
    private String name;

    @Column
    private String color;

    @ManyToMany(fetch =  FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "side_character_id", unique = true)
    private Set<SideCharacter> sideCharacters;

    protected Book(){}

    public Long getExternalId() {
        return externalId;
    }

    public void setExternalId(Long externalId) {
        this.externalId = externalId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Set<SideCharacter> getSideCharacters() {
        return sideCharacters;
    }

    public void setSideCharacters(Set<SideCharacter> sideCharacters) {
        this.sideCharacters = sideCharacters;
    }
}
