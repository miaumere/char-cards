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

@Component({
  selector: 'app-edit-chapters-menu',
  templateUrl: './edit-chapters-menu.component.html',
  styleUrls: ['./edit-chapters-menu.component.scss']

})
export class EditChaptersMenuComponent extends BaseComponent implements OnInit {

  isNewChapterFormVisible = true;

  chapterForm = new FormGroup({
    name: new FormControl('', Validators.required),
    chapterDesc: new FormControl('', Validators.required),
  });


  bookId: number;
  book: Book;

  chapters: Chapter[] = [];

  editedChapter: Chapter | null = null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storyService: StoryService,
    private _toastrService: ToastrService
  ) { super(); }

  ngOnInit() {
    this._activatedRoute?.parent?.queryParams
      .subscribe(queryParam => {
        this.bookId = +queryParam.id;
      });

    this.getBook();
    this.getChapters();

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

  insertNewChapterForm() {
    this.isNewChapterFormVisible = true;
  }

  createNewChapter() {
    this.editedChapter = null;
    const objToSend: EditChapter = {
      id: null,
      chapterDesc: this.chapterForm.get('chapterDesc')?.value,
      name: this.chapterForm.get('name')?.value,
      bookId: this.bookId
    }

    this.subscriptions$.add(
      this._storyService
        .editChapter(objToSend)
        .subscribe(_ => {
          this._toastrService.success('Udało się dodać nową część!');
          this.getChapters();
        }, err => {
          this._toastrService.error('Nie udało się dodać nowej części.');
        })

    )



  }

  editChapter() {
    if (this.editedChapter) {
      const objToSend: EditChapter = {
        id: this.editedChapter.id,
        chapterDesc: this.chapterForm.get('chapterDesc')?.value,
        name: this.chapterForm.get('name')?.value,
        bookId: this.bookId
      }

      this.subscriptions$.add(
        this._storyService
          .editChapter(objToSend)
          .subscribe(_ => {
            this._toastrService.success('Udało się edytować część!');
            this.getChapters();
          }, err => {
            this._toastrService.error('Nie udało się edytować części.');
          })

      )
    }
  }

  insertEditInfoToForm(chapter: Chapter) {
    this.chapterForm.get('chapterDesc')?.setValue(chapter.chapterDesc);
    this.chapterForm.get('name')?.setValue(chapter.name);

    this.editedChapter = chapter;
  }

  insertDeleteInfo() {
    this._toastrService.warning('Aby usunąć część, naciśnij dwa razy.');
  }

  deleteChapter(id: number) {
    this.subscriptions$.add(
      this._storyService
        .deleteChapter(id)
        .subscribe(_ => {
          this._toastrService.success('Udało się usunąć część!');
          this.getChapters();
        }, err => {
          this._toastrService.error('Nie udało się usunąć części.');
        })

    )

  }
}
