import { IBook } from './../../../../../../../../../pages/models/books/book.model';
import { Component, Input, OnInit } from '@angular/core';
import { IStarringIn } from 'src/app/modules/characters/models/starring-in.model';
import { Book } from 'src/app/modules/edit-story-panel/models/books/book.model';
import { StarringType } from 'src/app/modules/edit-story-panel/enums/StarringType.enum';

@Component({
    selector: 'app-starring-in-info [starringIn]',
    templateUrl: './starring-in-info.component.html',
    styleUrls: ['./starring-in-info.component.scss'],
})
export class StarringInInfoComponent implements OnInit {
    @Input() starringIn: IStarringIn[] | null = [];
    readonly mock = [
        {
            // readonly mock: { book: IBook }[] = [{
            book: {
                id: 1,
                name: 'Miłosny',
                color: 'pink',
                symbol: '💗',
                bookOrder: 1,
            },
            starringIn: [
                {
                    chapterId: 1,
                    chapterName: 'Część pierwsza',
                    starringType: StarringType.MAIN,
                },
            ],
        },
    ];

    constructor() {}

    ngOnInit() {
        console.log('starringIn: ', this.starringIn);
    }
}
