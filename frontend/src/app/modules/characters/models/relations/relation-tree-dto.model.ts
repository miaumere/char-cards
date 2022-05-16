import { RelationType } from './relation-type.enum';

export interface ICoordinatesRequest {
    characterId: number;
    x: number;
    y: number;
}
export interface IRelationTreePersonDto {
    id: number;
    fullName: string;
    imageMimeData: string;
    coordinates: {
        x: number;
        y: number;
    } | null;
}

export class RelationTreePersonDto implements IRelationTreePersonDto {
    id: number = 0;
    fullName: string = '';
    imageMimeData: string = '';
    coordinates: {
        x: number;
        y: number;
    } = { x: 50, y: 50 };

    constructor(initData: IRelationTreePersonDto) {
        Object.assign(this, initData);

        if (initData.coordinates === null) {
            this.coordinates = { x: 50, y: 50 };
        }
    }
}

export interface IRelationTreeRelation {
    source: number;
    target: number;
    type: RelationType;
    relationDateStart: string | null;
    relationDateEnd: string | null;
}
export class RelationTreeRelation implements IRelationTreeRelation {
    source: number = 0;
    target: number = 0;
    type: RelationType = RelationType.Crush;
    relationDateStart: string | null = null;
    relationDateEnd: string | null = null;

    constructor(initData: IRelationTreeRelation) {
        Object.assign(this, initData);
    }
}

export interface IRelationTreeDto {
    persons: IRelationTreePersonDto[];
    relations: IRelationTreeRelation[];
}

export class RelationTreeDto implements IRelationTreeDto {
    persons: RelationTreePersonDto[] = [];
    relations: RelationTreeRelation[] = [];

    constructor(initData: IRelationTreeDto) {
        for (const initDataPerson of initData.persons) {
            this.persons.push(new RelationTreePersonDto(initDataPerson));
        }
        for (const initDataRelation of initData.relations) {
            this.relations.push(new RelationTreeRelation(initDataRelation));
        }
    }
}

//#region DTOs for logged user
export interface IRelationForCharacter {
    person: IRelatedPersonData;
    relations: IRelation[];
}

export interface IRelation {
    id: number | null;
    type: RelationType;
    relationDateStart: number | null;
    arrowFromSource: boolean;
    relationDateEnd: number | null;
}
export interface IRelatedPersonData {
    id: number;
    fullName: string;
    imageMimeData: string;
}

// Request
export interface IRelationRequest {
    personId: number;
    relations: IRelation[];
}

//#endregion
