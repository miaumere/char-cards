import { Component, Input, OnInit } from '@angular/core';
import { IRelationship } from 'src/app/modules/characters/models/relationship.model';

@Component({
    selector: 'app-char-family-tree [charRelationships]',
    templateUrl: './char-family-tree.component.html',
    styleUrls: ['./char-family-tree.component.scss'],
})
export class CharFamilyTreeComponent implements OnInit {
    @Input() charRelationships: IRelationship[] | null;

    constructor() {}

    ngOnInit() {
        console.log('charRelationships: ', this.charRelationships);
    }
}
