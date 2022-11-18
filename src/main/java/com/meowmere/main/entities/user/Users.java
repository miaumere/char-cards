package com.meowmere.main.entities.user;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class Users {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long externalId;
    @Getter
    @Setter
    @Column(unique = true)
    private String username;
    @Getter
    @Setter
    @Column
    private String password;

}
