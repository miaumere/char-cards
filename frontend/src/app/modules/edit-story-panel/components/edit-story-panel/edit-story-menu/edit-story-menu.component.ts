import { ToastrService } from 'ngx-toastr';
import { AvailableIcons } from './../../../enums/AvailableIcons.enum';
import { StoryService } from './../../../../../core/service/story.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { Book } from '../../../models/books/book.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateBook } from '../../../models/books/create-book.model';
import { EditBook } from '../../../models/books/edit-book.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-story-menu-quotes',
  templateUrl: './edit-story-menu.component.html',
  styleUrls: ['./edit-story-menu.component.scss']
})

export class EditStoryMenuComponent extends BaseComponent implements OnInit {
  readonly AvailableIcons = AvailableIcons;
  books: Book[];

  editedBookId: number;

  editMode = false;

  form = new FormGroup({
    bookName: new FormControl('', Validators.required),
    bookColor: new FormControl('#C1C1C1'),
    icon: new FormControl()
  })


  constructor(
    private _storyService: StoryService,
    private _toastrService: ToastrService
  ) {
    super();
  }

  ngOnInit() {

    this.getAllBooks();
  }

  getAllBooks() {
    this._storyService
      .getAllBooks()
      .subscribe(books => {
        this.books = books;
      })
  }

  createNewBook() {
    const objToSend = new CreateBook();
    objToSend.name = this.form.controls['bookName'].value;
    objToSend.color = this.form.controls['bookColor'].value;
    objToSend.icon = this.form.controls['icon'].value;

    console.log(objToSend)
    this._storyService
      .createBook(objToSend)
      .subscribe(_ => {
        this._toastrService.success('Udało się dodać nowy szkicownik!');
        this.getAllBooks();
      }, err => {
        this._toastrService.error('Nie udało się dodać nowego szkicownika.');
      })
  }

  insertDeleteInfo() {
    this._toastrService.warning('Aby usunąć wybrany szkicownik, naciśnij dwa razy.');
  }

  deleteBook(bookId: number) {
    this._storyService
      .deleteBook(bookId)
      .subscribe(_ => {
        this._toastrService.success('Udało się usunąć wybrany szkicownik.');
        this.getAllBooks();
      }, err => {
        this._toastrService.error('Nie udało się usunąć wybranego szkicownika.')
      })
  }

  enableEditForm(book: Book) {
    this.editMode = true;
    this.editedBookId = book.id;
    this.form.controls['bookName'].setValue(book.name);
    this.form.controls['bookColor'].setValue(book.color);
    this.form.controls['icon'].setValue(book.icon);
  }

  editBook() {
    const objToSend = new EditBook();
    objToSend.id = this.editedBookId;
    objToSend.color = this.form.controls['bookColor'].value;
    objToSend.name = this.form.controls['bookName'].value;
    objToSend.icon = this.form.controls['icon'].value;

    this._storyService
      .putEditBook(objToSend)
      .subscribe(_ => {
        this._toastrService.success('Udało się edytować szkicownik!');
        this.getAllBooks();
      }, err => {
        this._toastrService.error('Wystąpił błąd przy edycji szkicownika.')
      });

  }

  drop(e: CdkDragDrop<string[]>) {
    const book = this.books[e.previousIndex]
    this.books.splice(e.previousIndex, 1);
    this.books.splice(e.currentIndex, 0, book);

    const ids: number[] = [];
    for (const key in this.books) {
      if (this.books.hasOwnProperty(key)) {
        const element = this.books[key];
        ids.push(element.id);
      }
    }

    this._storyService
      .patchBookSequence(ids)
      .subscribe(_ => {
        this.getAllBooks();
      }, err => {
        this._toastrService.success('Nie udało się zmienić kolejności szkicowników.');
      })

  }
}
