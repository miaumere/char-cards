package com.meowmere.main.Entities.characters;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "titles")
public class Titles {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column
    public String title;

    @Column(unique = true)
    public Long sequence;

    @OneToMany(mappedBy = "title", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Story> story;


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

    public Long getSequence() {
        return sequence;
    }

    public void setSequence(Long sequence) {
        this.sequence = sequence;
    }

    public Set<Story> getStory() {
        return story;
    }

    public void setStory(Set<Story> story) {
        this.story = story;
    }
}
