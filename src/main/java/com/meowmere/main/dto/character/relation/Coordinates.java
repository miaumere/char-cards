package com.meowmere.main.dto.character.relation;

public class Coordinates {
    private Integer x;
    private Integer y;

    public Coordinates() {

    }

    public Coordinates(Integer x, Integer y) {
        this.setX(x);
        this.setY(y);
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) {
        this.y = y;
    }
}
