import { RelationshipType } from '../enums/relationship-type.enum';

export interface IRelationRequest {
  charId: number;
  relCharId: number;
  relation: RelationshipType;
  reverseRelation: RelationshipType;
}
