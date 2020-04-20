import { IRelationship } from '../../characters/models/relationship.model';

export interface IRelationshipsForCharacter {
  relationship: IRelationship;
  reverseRelationshipType: string;
}
export class RelationshipsForCharacter implements IRelationshipsForCharacter {
  relationship: IRelationship;
  reverseRelationshipType: string;

  constructor(initialValues: RelationshipsForCharacter) {
    Object.assign(this, initialValues);
  }
}
