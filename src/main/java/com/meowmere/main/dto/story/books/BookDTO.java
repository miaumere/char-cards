package com.meowmere.main.dto.story.books;

public class BookDTO {
    private Long id;
    private String color;
    private String name;
    private String symbol;
    private Long bookOrder;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public Long getBookOrder() {
        return bookOrder;
    }

    public void setBookOrder(Long bookOrder) {
        this.bookOrder = bookOrder;
    }
}
