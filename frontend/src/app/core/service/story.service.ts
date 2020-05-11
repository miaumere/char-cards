import { EditChapter } from './../../modules/edit-story-panel/models/chapters/edit-chapter.model';
import { IChapter, Chapter } from './../../modules/edit-story-panel/models/chapters/chapter.model';
import { EditBook } from './../../modules/edit-story-panel/models/books/edit-book.model';
import { CreateBook } from './../../modules/edit-story-panel/models/books/create-book.model';
import { IBook, Book } from './../../modules/edit-story-panel/models/books/book.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Page, IPage } from 'src/app/modules/pages/models/pages/page.model';
import { IStarringCharacter, StarringCharacter } from 'src/app/modules/edit-story-panel/models/starring/starring-character.model';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private readonly storyControllerURL = '/api/stories';

  private readonly _getAllBooksURL = `${this.storyControllerURL}/get-all-books`;
  private readonly _getChapterForBookURL = `${this.storyControllerURL}/get-chapters-for-book`;
  private readonly _getStarringCharactersForChapterURL = `${this.storyControllerURL}/get-starring-characters`;

  private readonly _createBookURL = `${this.storyControllerURL}/new-book`;
  private readonly _editChapterURL = `${this.storyControllerURL}/edit-chapter`;
  private readonly _newPagesURL = `${this.storyControllerURL}/new-pages`;

  private readonly _editBookURL = `${this.storyControllerURL}/edit-book`;

  private readonly _patchBookOrderURL = `${this.storyControllerURL}/edit-book-order`;
  private readonly _patchChapterOrderURL = `${this.storyControllerURL}/edit-chapter-order`;
  private readonly _patchPagesOrderURL = `${this.storyControllerURL}/edit-pages-order`;

  private readonly _deleteBookURL = `${this.storyControllerURL}/delete-book`;
  private readonly _deleteChapterURL = `${this.storyControllerURL}/delete-chapter`;
  private readonly _deletePageURL = `${this.storyControllerURL}/delete-page`;
  private readonly _deleteCharFromChapterURL = `${this.storyControllerURL}/delete-char-from-chapter`;

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

  getStarringCharactersForChapter(id: number) {
    const params = new HttpParams().set('chapterId', '' + id);

    return this.http.get<IStarringCharacter[]>(this._getStarringCharactersForChapterURL, { params }).pipe(
      map(response => {
        const mappedResponse = response.map(r => new StarringCharacter(r));
        return mappedResponse;
      })
    )
  }


  createBook(requestBody: CreateBook) {
    return this.http.post<CreateBook>(this._createBookURL, requestBody);
  }

  postPages(formData: FormData, chapterId: number) {
    const params = new HttpParams()
      .set('chapterId', '' + chapterId)

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        CacheControl: 'max-age=0'
      }),
      params
    };
    return this.http.post<void>(this._newPagesURL, formData, httpOptions);
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

  patchPageSequence(requestBody: number[], chapterId: number) {
    const params = new HttpParams()
      .set('chapterId', '' + chapterId)

    return this.http.patch<number[]>(this._patchPagesOrderURL, requestBody, { params });
  }

  deleteBook(id: number) {
    const params = new HttpParams().set('id', '' + id);
    return this.http.delete<void>(this._deleteBookURL, { params });
  }

  deleteChapter(id: number) {
    const params = new HttpParams().set('id', '' + id);
    return this.http.delete<void>(this._deleteChapterURL, { params });
  }

  deletePage(pageId: number) {
    const params = new HttpParams()
      .set('pageId', '' + pageId);
    return this.http.delete<void>(this._deletePageURL, { params });
  }

  deleteCharFromChapter(id: number) {
    const params = new HttpParams().set('id', '' + id);
    return this.http.delete<void>(this._deleteCharFromChapterURL, { params });
  }

}
