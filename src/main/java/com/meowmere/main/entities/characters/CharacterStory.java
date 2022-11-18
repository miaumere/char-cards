package com.meowmere.main.entities.characters;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"character_id", "index_on_list"})})
public class CharacterStory {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Getter
    @Setter
    @Column
    private String title;

    @Getter
    @Setter
    @Column(length = 2000)
    private String storyDesc;

    @Getter
    @Setter
    @Column(name = "index_on_list")
    private int indexOnList;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_id")
    private Character character;

}
