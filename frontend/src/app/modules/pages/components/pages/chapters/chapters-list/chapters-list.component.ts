import { StoryService } from 'src/app/core/service/story.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';

import * as tinycolor from 'tinycolor2';
import { IChapterWithChars } from 'src/app/modules/pages/models/pages/chapter-with-chars.model';
import { StarringCharacter } from 'src/app/modules/edit-story-panel/models/starring/starring-character.model';

@Component({
    selector: 'app-chapters-list',
    templateUrl: './chapters-list.component.html',
    styleUrls: ['./chapters-list.component.scss'],
})
export class ChaptersListComponent extends BaseComponent implements OnInit {
    chapters: IChapterWithChars[] = [];
    fontColor = 'white';
    bookColor: string = '';
    bgColor: string = '';
    bookId: number = 0;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _storyService: StoryService
    ) {
        super();
    }

    ngOnInit() {
        this._activatedRoute?.parent?.queryParams.subscribe((queryParam) => {
            this.bookId = +queryParam.id;
            this.bookColor = queryParam.color;
            const bookColor = tinycolor(queryParam.color);
            if (bookColor.isLight()) {
                this.fontColor = 'black';
            }
            this.bgColor = '' + bookColor.darken(35).desaturate(30);
        });

        this.getChaptersWithCharacters();
    }

    getChaptersWithCharacters() {
        this.subscriptions$.add(
            this._storyService
                .getChaptersWithChars(this.bookId)
                .subscribe((chapters) => {
                    this.chapters = chapters;

                    for (const chapter of chapters) {
                        let sortedChars: StarringCharacter[] = [];
                        const mainCharacters = chapter.starringChars?.filter(
                            (x) => x.starringType === 'MAIN'
                        );
                        const sideCharacters = chapter.starringChars?.filter(
                            (x) => x.starringType === 'SIDE'
                        );
                        const bgCharacters = chapter.starringChars?.filter(
                            (x) => x.starringType === 'BACKGROUND'
                        );
                        const mentionedCharacters =
                            chapter.starringChars?.filter(
                                (x) => x.starringType === 'MENTIONED'
                            );

                        if (!!mainCharacters) {
                            sortedChars = mainCharacters;
                        }
                        if (!!sideCharacters) {
                            sortedChars = sortedChars.concat(sideCharacters);
                        }
                        if (!!bgCharacters) {
                            sortedChars = sortedChars.concat(bgCharacters);
                        }
                        if (!!mentionedCharacters) {
                            sortedChars =
                                sortedChars.concat(mentionedCharacters);
                        }
                        chapter.starringChars = sortedChars;
                    }
                })
        );
    }
}
