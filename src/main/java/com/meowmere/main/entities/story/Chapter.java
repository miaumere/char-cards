package com.meowmere.main.entities.story;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"book_id", "chapter_number"})})
public class Chapter {
    @Getter
    @Setter
    @Id
    @GeneratedValue
    private Long externalId;
    @Getter
    @Setter
    @Column
    private String name;
    @Getter
    @Setter
    @Column
    private String chapterDesc;
    @Getter
    @Setter
    @Column
    private Long createDate;
    @Getter
    @Setter
    @Column
    private String actionTime;
    @Getter
    @Setter
    @Column
    private String actionPlace;
    @Getter
    @Setter
    @Column
    private Boolean visible = false;
    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "book_id")
    public Book book;
    @Getter
    @Setter
    @OneToMany(mappedBy = "chapter", cascade = CascadeType.ALL)
    private List<Page> pages;
    @Getter
    @Setter
    @OneToMany(mappedBy = "chapter", cascade = CascadeType.ALL)
    private List<StarringCharacters> starringCharacters;
    @Getter
    @Setter
    @Column(name = "chapter_number")
    private int chapterNumber;
}
