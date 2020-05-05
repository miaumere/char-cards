import { ToastrService } from 'ngx-toastr';
import { AvailableIcons } from './../../../enums/AvailableIcons.enum';
import { StoryService } from './../../../../../core/service/story.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { Book } from '../../../models/books/book.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateBook } from '../../../models/books/create-book.model';

@Component({
  selector: 'app-edit-story-menu-quotes',
  templateUrl: './edit-story-menu.component.html',
  styleUrls: ['./edit-story-menu.component.scss']
})

export class EditStoryMenuComponent extends BaseComponent implements OnInit {
  readonly AvailableIcons = AvailableIcons;
  books: Book[];


  newBookForm = new FormGroup({
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
    objToSend.name = this.newBookForm.controls['bookName'].value;
    objToSend.color = this.newBookForm.controls['bookColor'].value;
    objToSend.icon = this.newBookForm.controls['icon'].value;

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


}
