package com.meowmere.main.entities.characters;

import com.meowmere.main.dto.character.colors.CharacterColorDTO;
import com.meowmere.main.dto.character.measurements.CharacterMeasurementsDTO;
import com.meowmere.main.dto.character.temperament.CharacterTemperamentDTO;
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
@Table(name = "measurements")
public class Measurements {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Getter
    @Setter
    @Column
    private Integer babyHeight;
    @Getter
    @Setter
    @Column
    private Integer babyWeight;
    @Getter
    @Setter
    @Column
    private Integer childHeight;
    @Getter
    @Setter
    @Column
    private Integer childWeight;
    @Getter
    @Setter
    @Column
    private Integer teenHeight;
    @Getter
    @Setter
    @Column
    private Integer teenWeight;
    @Getter
    @Setter
    @Column
    private Integer adultHeight;
    @Getter
    @Setter
    @Column
    private Integer adultWeight;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "character_id")
    private Character character;

    public void updateMeasurements(CharacterMeasurementsDTO request) {
        setBabyHeight(request.getBabyHeight());
        setBabyWeight(request.getBabyWeight());
        setChildHeight(request.getChildHeight());
        setChildWeight(request.getChildWeight());
        setTeenHeight(request.getTeenHeight());
        setTeenWeight(request.getTeenWeight());
        setAdultHeight(request.getAdultHeight());
        setAdultWeight(request.getAdultWeight());
    }

}