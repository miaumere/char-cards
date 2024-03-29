import { StoryService } from 'src/app/core/service/story.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { map } from 'rxjs/operators';
import * as tinycolor from 'tinycolor2';
import { Chapter } from '../../../models/chapters/chapter.model';
import { Book } from '../../../models/books/book.model';

@Component({
    selector: 'app-chapters',
    templateUrl: './chapters.component.html',
    styleUrls: ['./chapters.component.scss'],
})
export class ChaptersComponent extends BaseComponent implements OnInit {
    bookId: number = 0;
    book: Book | null = null;
    chapters: Chapter[] = [];

    bookColor: string = 'white';

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _storyService: StoryService
    ) {
        super();
    }

    ngOnInit() {
        this._activatedRoute?.parent?.queryParams.subscribe((queryParam) => {
            this.bookId = +queryParam.id;
            if (queryParam.chapterId) {
                this.getChapters();
            }
        });

        this.getBook();
    }

    getBook() {
        this.subscriptions$.add(
            this._storyService
                .getAllBooks()
                .pipe(map((arr) => arr.find((x) => x.id === this.bookId)))
                .subscribe((book) => {
                    if (book) {
                        this.book = book;
                        const bookColor = tinycolor(book.color);
                        this.bookColor =
                            '' +
                            (bookColor.isLight()
                                ? bookColor
                                : bookColor.lighten(35));
                    }
                })
        );
    }

    getChapters() {
        this.subscriptions$.add(
            this._storyService
                .getChaptersForBook(this.bookId)
                .subscribe((chapters) => {
                    this.chapters = chapters;
                })
        );
    }
}
