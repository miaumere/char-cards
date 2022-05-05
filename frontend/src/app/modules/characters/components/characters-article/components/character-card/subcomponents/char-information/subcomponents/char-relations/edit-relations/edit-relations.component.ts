import { Component, Input, OnInit } from '@angular/core';
import { IRelationTreeDto } from 'src/app/modules/characters/models/relations/relation-tree-dto.model';
import { RelationType } from 'src/app/modules/characters/models/relations/relation-type.enum';
import { IRelationship } from 'src/app/modules/characters/models/relationship.model';

@Component({
    selector: 'app-edit-relations [isUserLogged] [charRelationships]',
    templateUrl: './edit-relations.component.html',
    styleUrls: ['./edit-relations.component.scss'],
})
export class EditRelationsComponent implements OnInit {
    readonly RelationType = RelationType;
    @Input() isUserLogged: boolean = false;
    @Input('color') themeColor1: string = '';
    @Input() relations: IRelationTreeDto | null = null;
    @Input() charRelationships: IRelationship[] | null = null;
    @Input() profilePic: string | null = null;

    expandRelations = false;
    constructor() {}

    ngOnInit(): void {
        console.log('charRelationships', this.charRelationships);
    }
}
