package com.meowmere.main.entities.characters;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "colors")
public class Colors {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Getter
    @Setter
    @Column
    @Length(min = 3, max = 7)
    private String eyeColor1;

    @Getter
    @Setter
    @Column
    @Length(min = 3, max = 7)
    private String eyeColor2;

    @Getter
    @Setter
    @Column
    @Length(min = 3, max = 7)
    private String themeColor1;

    @Getter
    @Setter
    @Column
    @Length(min = 3, max = 7)
    private String themeColor2;

    @Getter
    @Setter
    @Column
    @Length(min = 3, max = 7)
    private String themeColor3;

    @Getter
    @Setter
    @Column
    @Length(min = 3, max = 7)
    private String hairColor;

    @Getter
    @Setter
    @Column
    @Length(min = 3, max = 7)
    private String skinColor;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_id", unique = true)
    private Character character;


}
