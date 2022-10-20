import {
    RelationType,
    RelationTypeString,
} from 'src/app/modules/characters/models/relations/relation-type.enum';

export const colorsForRelations = [
    {
        relationType: RelationType[RelationType.Parent] as RelationTypeString,
        fillColor: 'Tomato',
    },
    {
        relationType: RelationType[RelationType.Marriage] as RelationTypeString,
        fillColor: 'MediumPurple',
    },
    {
        relationType: RelationType[RelationType.Sibling] as RelationTypeString,
        fillColor: 'CornflowerBlue',
    },
    {
        relationType: RelationType[RelationType.Crush] as RelationTypeString,
        fillColor: 'LightPink',
    },
    {
        relationType: RelationType[
            RelationType.Infatuation
        ] as RelationTypeString,
        fillColor: 'magenta',
    },
    {
        relationType: RelationType[
            RelationType.Relationship
        ] as RelationTypeString,
        fillColor: 'purple',
    },
    {
        relationType: RelationType[RelationType.Romance] as RelationTypeString,
        fillColor: 'lime',
    },
];
