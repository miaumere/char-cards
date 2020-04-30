import { IProfilePic } from '../../admin-panel/models/images/profile-pic.model';
import { IRelatedCharacter } from './related-character.model';

export interface IRelationship {
  relatedCharacter: IRelatedCharacter;
  relationName: string;
}
