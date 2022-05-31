package com.meowmere.main.dto.character.relation;

import com.meowmere.main.enums.RelationType;

public class RelationTreeRelationDto {
    private Long source;
    private Long target;
    private RelationType type;
    private Long relationDateStart;
    private Long relationDateEnd;

    public Long getSource() {
        return source;
    }

    public void setSource(Long source) {
        this.source = source;
    }

    public Long getTarget() {
        return target;
    }

    public void setTarget(Long target) {
        this.target = target;
    }

    public RelationType getType() {
        return type;
    }

    public void setType(RelationType type) {
        this.type = type;
    }

    public Long getRelationDateStart() {
        return relationDateStart;
    }

    public void setRelationDateStart(Long relationDateStart) {
        this.relationDateStart = relationDateStart;
    }

    public Long getRelationDateEnd() {
        return relationDateEnd;
    }

    public void setRelationDateEnd(Long relationDateEnd) {
        this.relationDateEnd = relationDateEnd;
    }

}
