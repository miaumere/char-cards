import { CreateBook } from './../../modules/edit-story-panel/models/books/create-book.model';
import { IBook, Book } from './../../modules/edit-story-panel/models/books/book.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private readonly storyControllerURL = '/api/stories';

  private readonly _getAllBooksURL = `${this.storyControllerURL}/get-all-books`;
  private readonly _createBookURL = `${this.storyControllerURL}/new-book`;

  constructor(private http: HttpClient) {
  }

  getAllBooks() {
    return this.http.get<IBook[]>(this._getAllBooksURL).pipe(
      map(response => {
        const mappedResponse = response.map(r => new Book(r));
        return mappedResponse;
      })
    );
  }

  createBook(requestBody: CreateBook) {
    return this.http.post<CreateBook>(this._createBookURL, requestBody);
  }
}
