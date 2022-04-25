import { IRelationship } from '../../../characters/models/relationship.model';

export interface IRelationshipsForCharacter {
    relationship: IRelationship | null;
    reverseRelationshipType: string;
}
export class RelationshipsForCharacter implements IRelationshipsForCharacter {
    relationship: IRelationship | null = null;
    reverseRelationshipType: string = '';

    constructor(initialValues: RelationshipsForCharacter) {
        Object.assign(this, initialValues);
    }
}
