package com.meowmere.main.entities.characters;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames ={"character_id","index_on_list"})})
public class CharacterStory {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    public Long id;

    @Column
    private String title;

    @Column
    private String storyDesc;

    @Column(name="index_on_list")
    private int indexOnList;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_id")
    private Character character;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStoryDesc() {
        return storyDesc;
    }

    public void setStoryDesc(String storyDesc) {
        this.storyDesc = storyDesc;
    }

    public int getIndexOnList() {
        return indexOnList;
    }

    public void setIndexOnList(int indexOnList) {
        this.indexOnList = indexOnList;
    }

    public Character getCharacter() {
        return character;
    }

    public void setCharacter(Character character) {
        this.character = character;
    }
}
