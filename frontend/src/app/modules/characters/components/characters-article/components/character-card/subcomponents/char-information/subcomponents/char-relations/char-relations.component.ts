import { Component, Input, OnInit } from '@angular/core';
import { RelationshipType } from 'src/app/modules/admin-panel/enums/relationship-type.enum';
import { IRelationship } from 'src/app/modules/characters/models/relationship.model';

@Component({
    selector: 'app-char-relations [charRelationships]',
    templateUrl: './char-relations.component.html',
    styleUrls: ['./char-relations.component.scss'],
})
export class CharRelationsComponent implements OnInit {
    @Input() charRelationships: IRelationship[] | null = null;

    crushes: IRelationship[] | null = [];
    constructor() {}

    ngOnInit() {
        // FIXME: dodać typ relacji CRUSH

        if (
            this.charRelationships &&
            Array.isArray(this.charRelationships) &&
            this.charRelationships.length > 0
        ) {
            this.crushes = this.charRelationships.filter(
                (relation) =>
                    relation.relationName ===
                    RelationshipType[RelationshipType.MARRIAGE]
            );
        }
    }
}
