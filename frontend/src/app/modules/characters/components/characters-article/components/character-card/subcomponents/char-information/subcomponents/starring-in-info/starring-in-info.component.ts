import { Component, Input, OnInit } from '@angular/core';
import { IStarringIn } from 'src/app/modules/characters/models/starring-in.model';
import { Book } from 'src/app/modules/edit-story-panel/models/books/book.model';

@Component({
    selector: 'app-starring-in-info [starringIn]',
    templateUrl: './starring-in-info.component.html',
    styleUrls: ['./starring-in-info.component.scss'],
})
export class StarringInInfoComponent implements OnInit {
    @Input() starringIn: IStarringIn[] | null = [];

    chosenBookId: number = 0;

    constructor() {}

    ngOnInit() {
        console.log('starringIn: ', this.starringIn);

        if (
            this.starringIn &&
            !!this.starringIn.length &&
            this.starringIn[0]?.book?.id
        ) {
            this.chosenBookId = this.starringIn[0].book?.id;
            console.log('chosenBookId: ', this.chosenBookId);
        }
    }
}
