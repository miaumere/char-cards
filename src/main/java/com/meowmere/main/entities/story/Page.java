package com.meowmere.main.entities.story;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Page {
    @Id
    @GeneratedValue
    private Long id;

    @Column
    private int pageNumber;

    @Column
    private String fileLocation;

    @ManyToMany
    private Set<Chapter> chapters;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public String getFileLocation() {
        return fileLocation;
    }

    public void setFileLocation(String fileLocation) {
        this.fileLocation = fileLocation;
    }

    public Set<Chapter> getChapters() {
        return chapters;
    }

    public void setChapters(Set<Chapter> chapters) {
        this.chapters = chapters;
    }
}
