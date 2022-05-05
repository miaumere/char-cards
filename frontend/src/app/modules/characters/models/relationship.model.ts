import { RelationshipTypeString } from '../../admin-panel/enums/relationship-type.enum';
import { IRelatedCharacter } from './related-character.model';

export interface IRelationship {
    relatedCharacter: IRelatedCharacter;
    relationName: RelationshipTypeString;
}
