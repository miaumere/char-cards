export enum RelationType {
    Parent,
    Marriage,
    Sibling,
    Crush,
    Relationship,
    Infatuation,
    Romance,
}

export type RelationTypeString = keyof typeof RelationType;
