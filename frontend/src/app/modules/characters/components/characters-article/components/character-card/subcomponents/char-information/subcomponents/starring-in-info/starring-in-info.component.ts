import { IBook } from './../../../../../../../../../pages/models/books/book.model';
import { Component, Input, OnInit } from '@angular/core';
import { IStarringIn } from 'src/app/modules/characters/models/starring-in.model';
import { Book } from 'src/app/modules/edit-story-panel/models/books/book.model';
import { StarringType } from 'src/app/modules/edit-story-panel/enums/StarringType.enum';
import { BookForCharacter } from 'src/app/modules/characters/models/starring-in/book-for-character';

@Component({
    selector: 'app-starring-in-info [starringIn] [color]',
    templateUrl: './starring-in-info.component.html',
    styleUrls: ['./starring-in-info.component.scss'],
})
export class StarringInInfoComponent implements OnInit {
    readonly StarringType = StarringType;
    readonly squareHeight: number = 15;

    readonly mock: BookForCharacter[] = [
        {
            book: {
                id: 1,
                name: 'Miłosny',
                color: 'pink',
                symbol: '💗',
                bookOrder: 1,
            },
            chapters: [
                {
                    chapterId: 1,
                    chapterName: 'Część pierwsza',
                    starringType: StarringType.MAIN,
                },
                {
                    chapterId: 1,
                    chapterName: 'Część pierwsza',
                    starringType: StarringType.SIDE,
                },
                {
                    chapterId: 1,
                    chapterName: 'Część pierwsza',
                    starringType: StarringType.BACKGROUND,
                },
                {
                    chapterId: 1,
                    chapterName: 'Część pierwsza',
                    starringType: StarringType.MENTIONED,
                },
                {
                    chapterId: 1,
                    chapterName: 'Część pierwsza',
                    starringType: StarringType.NONE,
                },
            ],
        },
        {
            book: {
                id: 1,
                name: 'Ogórowy',
                color: 'green',
                symbol: '🥒',
                bookOrder: 2,
            },
            chapters: [
                {
                    chapterId: 2,
                    chapterName: 'Część druga',
                    starringType: StarringType.SIDE,
                },
                {
                    chapterId: 3,
                    chapterName: 'Część trzecia',
                    starringType: StarringType.MAIN,
                },
                {
                    chapterId: 3,
                    chapterName: 'Część trzecia',
                    starringType: StarringType.MAIN,
                },
                {
                    chapterId: 4,
                    chapterName: 'chuj',
                    starringType: null,
                },
            ],
        },
        {
            book: {
                id: 4,
                name: 'Bez Saturna',
                color: 'gray',
                symbol: '🦏',
                bookOrder: 5,
            },
            chapters: [],
        },
    ];

    @Input() starringIn: IStarringIn[] | null = [];
    @Input() color: string = 'grey';

    constructor() {}

    ngOnInit() {
        // console.log('starringIn: ', this.starringIn);
        console.log('mock: ', this.mock);

        const maxValue = this.mock.reduce((acc, value) => {
            if (acc.chapters.length > value.chapters.length) {
                return acc;
            } else {
                return value;
            }
        }).chapters.length;

        for (const mockItem of this.mock) {
            if (mockItem.chapters.length >= maxValue) {
                continue;
            }
            console.log('mockItem: ', mockItem);
            const loopLength = maxValue - mockItem.chapters.length;
            console.log('loopLength: ', loopLength);

            for (let index = 0; index < loopLength; index++) {
                mockItem.chapters.push({
                    chapterId: 0,
                    chapterName: '',
                    starringType: null,
                });
            }
        }
        console.log('new mock: ', this.mock);
    }

    setRectX(order: number): number {
        return order * 20;
    }
}
