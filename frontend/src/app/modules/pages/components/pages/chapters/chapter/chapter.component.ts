import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from 'src/app/core/service/story.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent extends BaseComponent implements OnInit {
  bookColor: string;
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
