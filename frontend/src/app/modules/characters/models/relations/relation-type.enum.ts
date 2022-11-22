export enum RelationType {
    Parent,
    Marriage,
    Sibling,
    Crush,
    Relationship,
    Infatuation,
    Romance,
    Pet,
}

export type RelationTypeString = keyof typeof RelationType;
