package com.meowmere.main.entities.sideCharacters;

import com.meowmere.main.entities.relationships.Relationship;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "side_character")
public class SideCharacter {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    public Long externalId;

    @Column
    public String sideCharacterName;

    @Column
    public String sideCharacterSurname;

    @Column(columnDefinition = "TEXT")
    private String sideCharacterDesc;

    @Column
    public Boolean archived = false;

    @ManyToMany(fetch =  FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "book_id")
    private List<com.meowmere.main.entities.sideCharacters.Book> books;

    @OneToMany(mappedBy = "sideCharacter", cascade = CascadeType.ALL)
    private Set<com.meowmere.main.entities.sideCharacters.ProfilePic> profilePics;

    @OneToMany(mappedBy = "sideCharacter", cascade = CascadeType.ALL)
    private List<Relationship> relationships;

    protected SideCharacter(){}

    public SideCharacter(String sideCharacterName, String sideCharacterSurname, String sideCharacterDesc) {
        this.sideCharacterName = sideCharacterName;
        this.sideCharacterSurname = sideCharacterSurname;
        this.sideCharacterDesc = sideCharacterDesc;
    }

    public Long getExternalId() {
        return externalId;
    }

    public void setExternalId(Long externalId) {
        this.externalId = externalId;
    }

    public String getSideCharacterName() {
        return sideCharacterName;
    }

    public void setSideCharacterName(String sideCharacterName) {
        this.sideCharacterName = sideCharacterName;
    }

    public String getSideCharacterSurname() {
        return sideCharacterSurname;
    }

    public void setSideCharacterSurname(String sideCharacterSurname) { this.sideCharacterSurname = sideCharacterSurname; }

    public String getSideCharacterDesc() {
        return sideCharacterDesc;
    }

    public void setSideCharacterDesc(String sideCharacterDesc) {
        this.sideCharacterDesc = sideCharacterDesc;
    }

    public Boolean getArchived() {
        return archived;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }

    public Set<com.meowmere.main.entities.sideCharacters.ProfilePic> getProfilePics() {
        return profilePics;
    }

    public void setProfilePics(Set<com.meowmere.main.entities.sideCharacters.ProfilePic> profilePics) {
        this.profilePics = profilePics;
    }

    public List<Relationship> getRelationships() {
        return relationships;
    }

    public void setRelationships(List<Relationship> relationships) {
        this.relationships = relationships;
    }
}




