package com.meowmere.main.dto.character.relation;
import com.meowmere.main.enums.RelationType;

public class RelationRequest {
    private Integer id;
    private Long sourceCharacterId;
    private Long targetCharacterId;

    private Long relationDateStart;
    private Long relationDateEnd;

    private RelationType type;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getSourceCharacterId() {
        return sourceCharacterId;
    }

    public void setSourceCharacterId(Long sourceCharacterId) {
        this.sourceCharacterId = sourceCharacterId;
    }

    public Long getTargetCharacterId() {
        return targetCharacterId;
    }

    public void setTargetCharacterId(Long targetCharacterId) {
        this.targetCharacterId = targetCharacterId;
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

    public RelationType getType() {
        return type;
    }

    public void setType(RelationType type) {
        this.type = type;
    }
}
