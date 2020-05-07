import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from 'src/app/core/service/story.service';
import * as tinycolor from 'tinycolor2';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent extends BaseComponent implements OnInit {
  bookColor: string;
  bgColor: string;
  chapterId: number;


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storyService: StoryService
  ) { super(); }

  ngOnInit() {
    this._activatedRoute?.parent?.queryParams
      .subscribe(queryParam => {
        this.chapterId = +queryParam.chapterId;
        this.bookColor = queryParam.color;
        const bookColor = tinycolor(queryParam.color);
        this.bgColor = bookColor.darken(35).desaturate(30)

      });

    this.getPagesForChapter();
  }

  getPagesForChapter() {
    this.subscriptions$.add(
      this._storyService
        .getPagesForChapter(this.chapterId)
        .subscribe(chapters => {
          console.log(chapters)
        })
    )
  }

}
