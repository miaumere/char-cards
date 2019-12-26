package com.meowmere.main.DTO.sideCharacters;

public class BookDTO {
    public Long externalId;
    public String name;
    public Long bookOrder;
    public String color;

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

    public Long getBookOrder() {
        return bookOrder;
    }

    public void setBookOrder(Long bookOrder) {
        this.bookOrder = bookOrder;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
