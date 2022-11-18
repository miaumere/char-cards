package com.meowmere.main.entities.story;


import com.meowmere.main.entities.characters.Character;
import com.meowmere.main.enums.StarringType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"character_id", "chapter_id"})})
public class StarringCharacters {
    @Getter
    @Setter
    @Id
    @GeneratedValue
    private Long externalId;
    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_id")
    private Character character;
    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "chapter_id")
    private Chapter chapter;
    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    @Column
    private StarringType starringType;
}
