export enum RelationshipType {
    PARENT,
    CHILD,
    MARRIAGE,
}

export type RelationshipTypeString = keyof typeof RelationshipType;
