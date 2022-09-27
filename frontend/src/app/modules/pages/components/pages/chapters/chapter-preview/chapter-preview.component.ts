import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from 'src/app/core/service/story.service';
import * as tinycolor from 'tinycolor2';
import { Page } from 'src/app/modules/pages/models/pages/page.model';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-chapter-preview [chapterId] [bookId]',
    templateUrl: './chapter-preview.component.html',
    styleUrls: ['./chapter-preview.component.scss'],
})
export class ChapterPreviewComponent extends BaseComponent implements OnInit {
    readonly pageURL = '/api/stories/get-images';
    pagesNumber: number[] = [];
    @Input() chapterId: number = 0;
    @Input() bookId: number = 0;

    pages: Page[] = [];

    @Input() currentImageIndex = 0;
    @Output() closedEvent = new EventEmitter<true>();

    constructor(private _storyService: StoryService) {
        super();
    }

    ngOnInit() {
        // this._activatedRoute?.parent?.queryParams.subscribe((queryParam) => {
        //     this.chapterId = +queryParam.chapterId;
        //     this.bookId = +queryParam.id;
        //     this.currentImageIndex = +queryParam.imageIndex;

        // });

        if (this.chapterId) {
            this.getChapter(this.chapterId);
        }
    }

    getChapter(id: number) {
        this.subscriptions$.add(
            this._storyService
                .getChaptersForBook(this.bookId)
                .pipe(map((arr) => arr.find((x) => x.id === id)))
                .subscribe((chapter) => {
                    if (chapter?.pagesIds) {
                        this.pagesNumber = chapter.pagesIds;
                    }
                })
        );
    }

    setImage(imageIndex: number) {
        this.currentImageIndex = imageIndex;
    }
}
