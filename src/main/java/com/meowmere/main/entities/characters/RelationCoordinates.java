package com.meowmere.main.entities.characters;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames ={"id_source","id_target"})})
public class RelationCoordinates {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "id_source")
    public Character sourceCharacter;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "id_target")
    public Character targetCharacter;

    @Column(name = "x_target")
    private Integer XTarget;

    @Column(name = "Y_target")
    private Integer YTarget;

    public RelationCoordinates(){}

    public RelationCoordinates(Character sourceCharacter, Character targetCharacter, Integer XTarget, Integer YTarget) {
        this.sourceCharacter = sourceCharacter;
        this.targetCharacter = targetCharacter;
        this.XTarget = XTarget;
        this.YTarget = YTarget;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public Integer getId() {
        return this.id;
    }

    public Character getSourceCharacter() {
        return sourceCharacter;
    }

    public void setSourceCharacter(Character sourceCharacter) {
        this.sourceCharacter = sourceCharacter;
    }

    public Character getTargetCharacter() {
        return targetCharacter;
    }

    public void setTargetCharacter(Character targetCharacter) {
        this.targetCharacter = targetCharacter;
    }

    public Integer getXTarget() {
        return XTarget;
    }

    public void setXTarget(Integer XTarget) {
        this.XTarget = XTarget;
    }

    public Integer getYTarget() {
        return YTarget;
    }

    public void setYTarget(Integer YTarget) {
        this.YTarget = YTarget;
    }
}
