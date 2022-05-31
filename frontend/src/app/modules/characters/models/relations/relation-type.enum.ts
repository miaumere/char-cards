export enum RelationType {
    Parent,
    Marriage,
    Sibling,
    Crush,
    Relationship,
}

export type RelationTypeString = keyof typeof RelationType;
