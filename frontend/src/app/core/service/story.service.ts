import { CreateBook } from './../../modules/edit-story-panel/models/books/create-book.model';
import { IBook, Book } from './../../modules/edit-story-panel/models/books/book.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private readonly storyControllerURL = '/api/stories';

  private readonly _getAllBooksURL = `${this.storyControllerURL}/get-all-books`;
  private readonly _createBookURL = `${this.storyControllerURL}/new-book`;
  private readonly _deleteBookURL = `${this.storyControllerURL}/delete-book`;


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

  deleteBook(id: number) {
    const params = new HttpParams().set('id', '' + id);
    return this.http.delete<void>(this._deleteBookURL, { params });
  }
}