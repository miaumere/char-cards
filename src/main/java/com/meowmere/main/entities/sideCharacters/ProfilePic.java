package com.meowmere.main.entities.sideCharacters;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Entity
@Table(name = "profile_pic")
public class ProfilePic {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column
    private byte[] profilePic;

    @Column
    private String name;

    @Column
    private String extension;

    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_id")
    private SideCharacter sideCharacter;

    public Long getId() {
        return id;
    }

    public byte[] getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(byte[] profilePic) {
        this.profilePic = profilePic;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public SideCharacter getSideCharacter() {
        return sideCharacter;
    }

    public void setSideCharacter(SideCharacter sideCharacter) {
        this.sideCharacter = sideCharacter;
    }
}
