package com.meowmere.main.entities.story;

import com.meowmere.main.enums.AvailableIcon;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@NoArgsConstructor

@Entity
@Table(name = "book")
public class Book {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long externalId;
    @Getter
    @Setter
    @Column
    private String name;
    @Getter
    @Setter
    @Column
    private Long bookOrder;
    @Getter
    @Setter
    @Column
    private String color;
    @Getter
    @Setter
    @Column
    private String symbol;
    @Getter
    @Setter
    @Column
    @Enumerated(EnumType.STRING)
    private AvailableIcon icon;
    @Getter
    @Setter
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private Set<Chapter> chapters;


}
