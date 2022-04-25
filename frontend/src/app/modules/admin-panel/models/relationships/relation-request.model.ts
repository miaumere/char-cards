import { RelationshipType } from '../../enums/relationship-type.enum';

export interface IRelationRequest {
    charId: number;
    relcharId: number;
    relation: string;
    reverseRelation: string;
}
