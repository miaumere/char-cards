package com.meowmere.main.entities.story;

import com.meowmere.main.enums.AvailableIcon;

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
    private Long bookOrder;

    @Column
    private String color;

    @Column
    private String symbol;

    @Column
    @Enumerated(EnumType.STRING)
    private AvailableIcon icon;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private Set<Chapter> chapters;

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

    public AvailableIcon getIcon() {
        return icon;
    }

    public void setIcon(AvailableIcon icon) {
        this.icon = icon;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }
}
