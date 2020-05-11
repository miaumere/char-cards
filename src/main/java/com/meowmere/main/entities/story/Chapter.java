package com.meowmere.main.entities.story;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames ={"book_id","chapter_number"})})
public class Chapter {
    @Id
    @GeneratedValue
    private Long externalId;

    @Column
    private String name;

    @Column
    private String chapterDesc;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "book_id")
    public Book book;

    @OneToMany(mappedBy = "chapter", cascade = CascadeType.ALL)
    private List<Page> pages;

    @Column(name="chapter_number")
    private int chapterNumber;

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

    public String getChapterDesc() {
        return chapterDesc;
    }

    public void setChapterDesc(String chapterDesc) {
        this.chapterDesc = chapterDesc;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public int getChapterNumber() {
        return chapterNumber;
    }

    public void setChapterNumber(int chapterNumber) {
        this.chapterNumber = chapterNumber;
    }

    public List<Page> getPages() {
        return pages;
    }

    public void setPages(List<Page> pages) {
        this.pages = pages;
    }
}
