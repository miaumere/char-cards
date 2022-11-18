package com.meowmere.main.entities.characters;

import com.meowmere.main.enums.RelationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"character_id", "character_related_to_id", "type", "relation_date_start", "relation_date_end"})})
public class Relation {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_id")
    public Character character;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_related_to_id")
    public Character relatedCharacter;

    @Getter
    @Setter
    @Column
    @Enumerated(EnumType.STRING)
    private RelationType type;

    @Getter
    @Setter
    @Column(name = "relation_date_start")
    @ColumnDefault("0")
    private Long relationDateStart = 0L;

    @Getter
    @Setter
    @Column(name = "relation_date_end")
    @ColumnDefault("0")
    private Long relationDateEnd = 0L;
}
