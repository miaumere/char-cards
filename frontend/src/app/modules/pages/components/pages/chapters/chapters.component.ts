import { StoryService } from 'src/app/core/service/story.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { Book } from 'src/app/modules/edit-story-panel/models/books/book.model';
import { map } from 'rxjs/operators';
import { Chapter } from 'src/app/modules/edit-story-panel/models/chapters/chapter.model';
import * as tinycolor from 'tinycolor2';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss']
})
export class ChaptersComponent extends BaseComponent implements OnInit {
  bookId: number;
  book: Book;
  chapters: Chapter[] = [];
  fontColor = 'white';


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storyService: StoryService
  ) { super(); }

  ngOnInit() {
    this._activatedRoute?.parent?.queryParams
      .subscribe(queryParam => {
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
        .pipe(
          map(arr => arr.find(x => x.id === this.bookId)
          )
        )
        .subscribe(book => {
          if (book) {
            this.book = book;

            const bookColor = tinycolor(book?.color);
            if (bookColor.isLight()) {
              this.fontColor = 'black';
            }
          }
        })

    )
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
