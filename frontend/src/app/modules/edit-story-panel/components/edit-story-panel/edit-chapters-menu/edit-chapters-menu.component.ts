import { ToastrService } from 'ngx-toastr';
import { IChapter } from './../../../models/chapters/chapter.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { StoryService } from 'src/app/core/service/story.service';
import { Chapter } from '../../../models/chapters/chapter.model';
import { Book } from '../../../models/books/book.model';
import { find, filter, map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EditChapter } from '../../../models/chapters/edit-chapter.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import * as tinycolor from 'tinycolor2';

@Component({
  selector: 'app-edit-chapters-menu',
  templateUrl: './edit-chapters-menu.component.html',
  styleUrls: ['./edit-chapters-menu.component.scss']

})
export class EditChaptersMenuComponent extends BaseComponent implements OnInit {
  bookId: number;
  book: Book;
  chapters: Chapter[] = [];
  fontColor = 'white';
  bgColor: string;

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

            this.bgColor = bookColor.darken(35).desaturate(30);
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
