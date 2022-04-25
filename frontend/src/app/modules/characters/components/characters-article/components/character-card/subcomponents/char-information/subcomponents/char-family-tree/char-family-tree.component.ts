import { Component, Input, OnInit } from '@angular/core';
import { RelationshipType } from 'src/app/modules/admin-panel/enums/relationship-type.enum';
import { IRelationship } from 'src/app/modules/characters/models/relationship.model';

@Component({
    selector: 'app-char-family-tree [charRelationships]',
    templateUrl: './char-family-tree.component.html',
    styleUrls: ['./char-family-tree.component.scss'],
})
export class CharFamilyTreeComponent implements OnInit {
    @Input() charRelationships: IRelationship[] | null = null;

    crushes: IRelationship[] | null = [];
    constructor() {}

    ngOnInit() {
        console.log('charRelationships: ', this.charRelationships);

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
