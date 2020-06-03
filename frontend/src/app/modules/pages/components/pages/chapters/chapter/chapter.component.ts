import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from 'src/app/core/service/story.service';
import * as tinycolor from 'tinycolor2';
import { Page } from 'src/app/modules/pages/models/pages/page.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent extends BaseComponent implements OnInit {
  private readonly pageURL = '/api/stories/get-images';
  pagesNumber: number[];
  bookColor: string;
  bgColor: string;
  chapterId: number;
  bookId: number;

  pages: Page[];

  currentImageIndex = 0;


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storyService: StoryService
  ) { super(); }

  ngOnInit() {
    this._activatedRoute?.parent?.queryParams
      .subscribe(queryParam => {
        this.chapterId = +queryParam.chapterId;
        this.bookId = +queryParam.id;
        this.bookColor = queryParam.color;

        const bookColor = tinycolor(queryParam.color);
        this.bgColor = bookColor.darken(35).desaturate(30)

        this.getChapter(this.chapterId);
      });

  }

  getChapter(id: number) {
    this.subscriptions$.add(
      this._storyService
        .getChaptersForBook(this.bookId)
        .pipe(
          map(arr => arr.find(x => x.id === id)
          )
        ).subscribe(chapter => {
          if (chapter?.pagesIds) {
            this.pagesNumber = chapter.pagesIds;
            console.log(this.pagesNumber)
          }
        })
    )
  }



  setImage(imageIndex: number) {
    this.currentImageIndex = imageIndex;
  }

}
