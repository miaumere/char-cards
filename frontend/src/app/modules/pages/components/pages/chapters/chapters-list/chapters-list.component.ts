import { StoryService } from 'src/app/core/service/story.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { Book } from 'src/app/modules/edit-story-panel/models/books/book.model';
import { map } from 'rxjs/operators';
import { Chapter } from 'src/app/modules/edit-story-panel/models/chapters/chapter.model';
import * as tinycolor from 'tinycolor2';

@Component({
  selector: 'app-chapters-list',
  templateUrl: './chapters-list.component.html',
  styleUrls: ['./chapters-list.component.scss']
})
export class ChaptersListComponent extends BaseComponent implements OnInit {
  chapters: Chapter[] = [];
  fontColor = 'white';
  bookColor: string;
  bookId: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storyService: StoryService
  ) { super(); }

  ngOnInit() {
    this._activatedRoute?.parent?.queryParams
      .subscribe(queryParam => {
        this.bookId = +queryParam.id;
        this.bookColor = queryParam.color;
      });

    this.getChapters();

  }


  getChapters() {
    this.subscriptions$.add(
      this._storyService
        .getChaptersForBook(this.bookId)
        .subscribe(chapters => {
          this.chapters = chapters;
        })
    );

  }

}
