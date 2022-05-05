package com.meowmere.main.dto.character.relation;

import com.meowmere.main.enums.RelationType;

public class RelationTreeRelationDto {
    private Integer source;
    private Integer target;
    private RelationType type;
    private Boolean arrowFromSource;
    private String relationDateStart;
    private String relationDateEnd;

    public Integer getSource() {
        return source;
    }

    public void setSource(Integer source) {
        this.source = source;
    }

    public Integer getTarget() {
        return target;
    }

    public void setTarget(Integer target) {
        this.target = target;
    }

    public RelationType getType() {
        return type;
    }

    public void setType(RelationType type) {
        this.type = type;
    }

    public Boolean getArrowFromSource() {
        return arrowFromSource;
    }

    public void setArrowFromSource(Boolean arrowFromSource) {
        this.arrowFromSource = arrowFromSource;
    }

    public String getRelationDateStart() {
        return relationDateStart;
    }

    public void setRelationDateStart(String relationDateStart) {
        this.relationDateStart = relationDateStart;
    }

    public String getRelationDateEnd() {
        return relationDateEnd;
    }

    public void setRelationDateEnd(String relationDateEnd) {
        this.relationDateEnd = relationDateEnd;
    }


}
