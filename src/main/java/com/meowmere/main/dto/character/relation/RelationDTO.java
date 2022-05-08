package com.meowmere.main.dto.character.relation;

import com.meowmere.main.enums.RelationType;

public class RelationDTO {
    private Integer id;
    private RelationType Type;
    private Boolean arrowFromSource;
    private Long relationDateStart;
    private Long relationDateEnd;

    public RelationDTO(Integer id, RelationType type, Boolean arrowFromSource, Long relationDateStart, Long relationDateEnd) {
        Type = type;
        this.arrowFromSource = arrowFromSource;
        this.relationDateStart = relationDateStart;
        this.relationDateEnd = relationDateEnd;
        this.id = id;
    }

    public RelationType getType() {
        return Type;
    }

    public void setType(RelationType type) {
        Type = type;
    }

    public Boolean getArrowFromSource() {
        return arrowFromSource;
    }

    public void setArrowFromSource(Boolean arrowFromSource) {
        this.arrowFromSource = arrowFromSource;
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
