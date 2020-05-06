import { StoryService } from 'src/app/core/service/story.service';
import { BaseComponent } from 'src/app/core/base.component';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/modules/edit-story-panel/models/books/book.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent extends BaseComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private _storyService: StoryService

  ) { super(); }

  ngOnInit() {
    this.getAllBooks();
  }


  getAllBooks() {
    this.subscriptions$.add(
      this._storyService
        .getAllBooks()
        .subscribe(books => {
          this.books = books;
        })

    )
  }

}
