package com.meowmere.main.entities.characters;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "temperament")
public class Temperament {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Getter
    @Setter
    @Column
    private Integer melancholic;
    @Getter
    @Setter
    @Column
    private Integer sanguine;
    @Getter
    @Setter
    @Column
    private Integer flegmatic;
    @Getter
    @Setter
    @Column
    private Integer choleric;
    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_id", unique = true)
    private Character character;


}
