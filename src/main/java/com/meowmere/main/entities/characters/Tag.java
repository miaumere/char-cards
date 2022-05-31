package com.meowmere.main.entities.characters;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames ={"name","color"})})
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column
    private String name;

    @Column
    private String color;

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    private List<CharacterTag> characterTags;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public List<CharacterTag> getCharacterTags() {
        return characterTags;
    }

    public void setCharacterTags(List<CharacterTag> characterTags) {
        this.characterTags = characterTags;
    }
}