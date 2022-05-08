import { RelationType } from './relation-type.enum';

export interface IRelationTreePersonDto {
    id: number;
    fullName: string;
    imageMimeData: string;
    coordinates: {
        x: number;
        y: number;
    };
}

export interface IRelationTreeRelation {
    source: number;
    target: number;
    type: RelationType;
    arrowFromSource: boolean | null;
    relationDateStart: string | null;
    relationDateEnd: string | null;
}

export interface IRelationTreeDto {
    persons: IRelationTreePersonDto[];
    relations: IRelationTreeRelation[];
}

//#region DTOs for logged user
export interface IRelationForCharacter {
    person: IRelatedPersonData;
    relations: IRelation[];
}

export interface IRelation {
    id: number | null;
    type: RelationType;
    relationDateStart: string | null;
    relationDateEnd: string | null;
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

// MOCK
export const mockData: IRelationTreeDto = {
    persons: [
        {
            id: 1,
            fullName: 'Saturn',
            imageMimeData: 'GreenYellow',
            coordinates: {
                x: 250,
                y: 450,
            },
        },
        {
            id: 2,
            fullName: 'Stary Saturna',
            imageMimeData: 'AliceBlue',
            coordinates: {
                x: 300,
                y: 360,
            },
        },
        {
            id: 3,
            fullName: 'Stara Saturna',
            imageMimeData: 'LemonChiffon',
            coordinates: {
                x: 100,
                y: 400,
            },
        },
        {
            id: 4,
            fullName: 'Dziad Saturna o.s. ojca',
            imageMimeData: 'LightSlateGray',
            coordinates: {
                x: 200,
                y: 150,
            },
        },
        {
            id: 5,
            fullName: 'Step brat saturna',
            imageMimeData: 'Goldenrod',
            coordinates: {
                x: 10,
                y: 450,
            },
        },
        {
            id: 6,
            fullName: 'Siostra Saturna',
            imageMimeData: 'Orchid',
            coordinates: {
                x: 100,
                y: 600,
            },
        },
        {
            id: 7,
            fullName: 'Maz siostry Saturna',
            imageMimeData: 'Teal',
            coordinates: {
                x: 20,
                y: 700,
            },
        },
        {
            id: 8,
            fullName: 'Uran',
            imageMimeData: 'PaleTurquoise',
            coordinates: {
                x: 370,
                y: 500,
            },
        },
        {
            id: 9,
            fullName: 'Bardzo lubi Michaela Jacksona',
            imageMimeData: 'RosyBrown',
            coordinates: {
                x: 350,
                y: 700,
            },
        },
    ],
    relations: [
        {
            source: 1,
            target: 2,
            type: RelationType.Parent,
            arrowFromSource: false,
            relationDateStart: null,
            relationDateEnd: null,
        },
        {
            source: 1,
            target: 3,
            type: RelationType.Parent,
            arrowFromSource: false,
            relationDateStart: null,
            relationDateEnd: null,
        },
        {
            source: 2,
            target: 4,
            type: RelationType.Parent,
            arrowFromSource: false,
            relationDateStart: null,
            relationDateEnd: null,
        },
        {
            source: 2,
            target: 3,
            type: RelationType.Marriage,
            arrowFromSource: null,
            relationDateStart: '01/01/2022 00:00:00',
            relationDateEnd: '01/01/2023 00:00:00',
        },

        {
            source: 1,
            target: 5,
            type: RelationType.Sibling,
            arrowFromSource: false,
            relationDateStart: null,
            relationDateEnd: null,
        },
        {
            source: 5,
            target: 3,
            type: RelationType.Parent,
            arrowFromSource: false,
            relationDateStart: null,
            relationDateEnd: null,
        },
        {
            source: 1,
            target: 6,
            type: RelationType.Sibling,
            arrowFromSource: null,
            relationDateStart: null,
            relationDateEnd: null,
        },
        {
            source: 6,
            target: 2,
            type: RelationType.Parent,
            arrowFromSource: false,
            relationDateStart: null,
            relationDateEnd: null,
        },
        {
            source: 6,
            target: 3,
            type: RelationType.Parent,
            arrowFromSource: false,
            relationDateStart: null,
            relationDateEnd: null,
        },
        {
            source: 6,
            target: 7,
            type: RelationType.Marriage,
            arrowFromSource: null,
            relationDateStart: '01/01/2022 00:00:00',
            relationDateEnd: null,
        },
        {
            source: 1,
            target: 8,
            type: RelationType.Crush,
            arrowFromSource: false,
            relationDateStart: null,
            relationDateEnd: null,
        },
        {
            source: 1,
            target: 9,
            type: RelationType.Crush,
            arrowFromSource: true,
            relationDateStart: null,
            relationDateEnd: '01/03/2022 00:00:00',
        },
        {
            source: 8,
            target: 1,
            type: RelationType.Crush,
            arrowFromSource: true,
            relationDateStart: null,
            relationDateEnd: null,
        },
    ],
};
