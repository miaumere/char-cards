import { Component, Input, OnInit } from '@angular/core';
import {
    IRelation,
    IRelationForCharacter,
    IRelationTreeDto,
} from 'src/app/modules/characters/models/relations/relation-tree-dto.model';
import { RelationType } from 'src/app/modules/characters/models/relations/relation-type.enum';
import { IRelationship } from 'src/app/modules/characters/models/relationship.model';

@Component({
    selector: 'app-edit-relations [charId]',
    templateUrl: './edit-relations.component.html',
    styleUrls: ['./edit-relations.component.scss'],
})
export class EditRelationsComponent implements OnInit {
    readonly RelationType = RelationType;
    @Input('color') themeColor1: string = '';
    @Input() charId: number = 0;

    relations: IRelationForCharacter[] = [];

    expandRelations = false;
    constructor() {}

    ngOnInit(): void {}

    getCharacterRelations() {}
}
