import { EditChapter } from './../../modules/edit-story-panel/models/chapters/edit-chapter.model';
import { IChapter, Chapter } from './../../modules/edit-story-panel/models/chapters/chapter.model';
import { EditBook } from './../../modules/edit-story-panel/models/books/edit-book.model';
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
  private readonly _getChapterForBookURL = `${this.storyControllerURL}/get-chapters-for-book`;
  private readonly _getPagesForChapterURL = `${this.storyControllerURL}/get-pages-for-chapters`;

  private readonly _createBookURL = `${this.storyControllerURL}/new-book`;
  private readonly _editChapterURL = `${this.storyControllerURL}/edit-chapter`;

  private readonly _editBookURL = `${this.storyControllerURL}/edit-book`;

  private readonly _patchBookOrderURL = `${this.storyControllerURL}/edit-book-order`;
  private readonly _patchChapterOrderURL = `${this.storyControllerURL}/edit-chapter-order`;

  private readonly _deleteBookURL = `${this.storyControllerURL}/delete-book`;
  private readonly _deleteChapterURL = `${this.storyControllerURL}/delete-chapter`;

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

  getChaptersForBook(id: number) {
    const params = new HttpParams().set('id', '' + id);

    return this.http.get<IChapter[]>(this._getChapterForBookURL, { params }).pipe(
      map(response => {
        const mappedResponse = response.map(r => new Chapter(r));
        return mappedResponse;
      })
    );
  }

  getPagesForChapter(id: number) {
    const params = new HttpParams().set('id', '' + id);

    return this.http.get<void>(this._getPagesForChapterURL, { params });
  }

  createBook(requestBody: CreateBook) {
    return this.http.post<CreateBook>(this._createBookURL, requestBody);
  }

  editChapter(requestBody: EditChapter) {
    return this.http.post<EditChapter>(this._editChapterURL, requestBody);
  }

  putEditBook(requestBody: EditBook) {
    return this.http.put<EditBook>(this._editBookURL, requestBody);
  }

  patchBookSequence(requestBody: number[]) {
    return this.http.patch<number[]>(this._patchBookOrderURL, requestBody);
  }

  patchChapterSequence(requestBody: number[], bookId: number) {
    const params = new HttpParams().set('bookId', '' + bookId);

    return this.http.patch<number[]>(this._patchChapterOrderURL, requestBody, { params });
  }

  deleteBook(id: number) {
    const params = new HttpParams().set('id', '' + id);
    return this.http.delete<void>(this._deleteBookURL, { params });
  }

  deleteChapter(id: number) {
    const params = new HttpParams().set('id', '' + id);
    return this.http.delete<void>(this._deleteChapterURL, { params });
  }
}
