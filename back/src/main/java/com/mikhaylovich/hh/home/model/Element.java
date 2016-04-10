package com.mikhaylovich.hh.home.model;

/**
 * @author mhty
 * @date 10.04.16.
 */
public class Element {
    private String id;
    private String text;

    public Element() {
        super();
    }

    public Element(String id, String text) {
        this.text = text;
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "[" + id + ": " + text + "]";

    }
}
