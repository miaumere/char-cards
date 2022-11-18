package com.meowmere.main.entities.story;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Entity
public class Page {
    @Getter
    @Setter
    @Id
    @GeneratedValue
    private Long id;
    @Getter
    @Setter
    @Column
    private int pageNumber;
    @Getter
    @Setter
    @Column
    private String fileLocation;
    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "chapter_id")
    public Chapter chapter;

}
