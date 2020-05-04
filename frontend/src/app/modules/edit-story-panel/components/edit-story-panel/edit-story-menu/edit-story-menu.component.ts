import { StoryService } from './../../../../../core/service/story.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { Book } from '../../../models/books/book.model';

@Component({
  selector: 'app-edit-story-menu-quotes',
  templateUrl: './edit-story-menu.component.html',
  styleUrls: ['./edit-story-menu.component.scss']
})

export class EditStoryMenuComponent extends BaseComponent implements OnInit {

  books: Book[];

  constructor(private _storyService: StoryService) {
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
}
