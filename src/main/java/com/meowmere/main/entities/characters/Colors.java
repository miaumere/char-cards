package com.meowmere.main.entities.characters;

import com.meowmere.main.dto.character.colors.CharacterColorDTO;
import com.meowmere.main.enums.CharType;
import com.meowmere.main.enums.Gender;
import com.meowmere.main.requests.characters.character.EditCharacterRequest;
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

    public void updateColors(CharacterColorDTO request) {
        setThemeColor1(request.getThemeColor1());
        setThemeColor2(request.getThemeColor2());
        setThemeColor3(request.getThemeColor3());
        setEyeColor1(request.getEyeColor1());
        setEyeColor2(request.getEyeColor2());
        setHairColor(request.getHairColor());
        setSkinColor(request.getSkinColor());
    }

}
