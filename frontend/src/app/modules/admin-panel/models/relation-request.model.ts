import { RelationshipType } from '../enums/relationship-type.enum';

export interface IRelationRequest {
  charId: number;
  relCharId: number;
  relation: string;
  reverseRelation: string;
}
