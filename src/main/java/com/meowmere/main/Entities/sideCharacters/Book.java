package com.meowmere.main.Entities.sideCharacters;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    public Long externalId;

    @Column
    private String name;

    @Column
    private Long bookOrder;

    @Column
    private String color;

    @ManyToMany(fetch =  FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "side_character_id", unique = true)
    private List<SideCharacter> sideCharacters;

    public Book(){}

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

    public Long getBookOrder() { return bookOrder; }

    public void setBookOrder(Long bookOrder) { this.bookOrder = bookOrder; }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public List<SideCharacter> getSideCharacters() {
        return sideCharacters;
    }

    public void setSideCharacters(List<SideCharacter> sideCharacters) {
        this.sideCharacters = sideCharacters;
    }
}
