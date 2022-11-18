package com.meowmere.main.entities.characters;

import io.micrometer.core.lang.Nullable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"character_id", "prefered_character_id", "date_of_origin"})})
public class Preference {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

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
    @JoinColumn(name = "prefered_character_id")
    private Character preferedCharacter;

    @Getter
    @Setter
    @Column
    @Range(min = 0, max = 100)
    private int range;

    @Getter
    @Setter
    @Column(name = "date_of_origin")
    @Nullable
    private Date dateOfOrigin;

}
