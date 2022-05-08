package com.meowmere.main.dto.character.relation;

import com.meowmere.main.enums.RelationType;

public class RelationDTO {
    private Integer id;
    private RelationType Type;
    private Boolean arrowFromSource;
    private String relationDateStart;
    private String relationDateEnd;

    public RelationDTO(Integer id, RelationType type, Boolean arrowFromSource, String relationDateStart, String relationDateEnd) {
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
