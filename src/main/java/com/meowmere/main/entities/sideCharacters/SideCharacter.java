package com.meowmere.main.entities.sideCharacters;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.validator.constraints.Length;

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
    private String sideCharacterName;

    @Column
    private String sideCharacterSurname;

    @Column
    @Length(max = 2000)
    private String sideCharacterDesc;

    @Column
    public Boolean archived = false;

    @ManyToMany(fetch =  FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "book_id")
    private List<Book> books;

    @OneToMany(mappedBy = "sideCharacter", cascade = CascadeType.ALL)
    private Set<ProfilePic> profilePics;

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

    public Set<ProfilePic> getProfilePics() {
        return profilePics;
    }

    public void setProfilePics(Set<ProfilePic> profilePics) {
        this.profilePics = profilePics;
    }
}




