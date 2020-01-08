import { NewTitle } from './../../modules/admin-panel/models/new-title.model';
import { EditTitle } from './../../modules/admin-panel/models/edit-title.model';
import { EditCharacter } from './../../modules/admin-panel/models/edit-character.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CharacterItem, CharacterForListItem } from 'src/app/modules/characters/models/character-item.model';
import { Character } from 'src/app/modules/characters/models/character.model';
import { CharacterForChange } from 'src/app/modules/admin-panel/models/character-for-change.model';
import { Titles } from 'src/app/modules/admin-panel/models/titles.model';
import { StoryForCharacter } from 'src/app/modules/admin-panel/models/story.model';
import { Quote } from 'src/app/modules/characters/models/quote.model';
import { NewQuote } from 'src/app/modules/admin-panel/models/new-quote.model';
import { EditQuote } from 'src/app/modules/admin-panel/models/edit-quote.model';
import { StoryToSend } from 'src/app/modules/admin-panel/models/story-to-send.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  charControllerURL = '/api/characters';

  private _getNonArchivedCharactersURL = `${this.charControllerURL}/get-characters`;
  private _getCharacterByIdURL = `${this.charControllerURL}/get-character`;
  private _getAllCharactersURL = `${this.charControllerURL}/get-all-characters`;
  private _getStoryTitlesURL = `${this.charControllerURL}/get-titles`;
  private _getCharacterDetailsURL = `${this.charControllerURL}/get-details`;
  private _getQuotesURL = `${this.charControllerURL}/get-quotes`;
  private _getStoriesForCharURL = `${this.charControllerURL}/get-stories`;

  private _patchChangeStateURL = `${this.charControllerURL}/change-state`;
  private _patchQuoteURL = `${this.charControllerURL}/edit-quote`;
  private _patchTitleURL = `${this.charControllerURL}/edit-title`;
  private _patchTitlesSequenceURL = `${this.charControllerURL}/set-title-sequence`;
  private _patchStoryURL = `${this.charControllerURL}/edit-story`;

  private _postStoryForCharacterURL = `${this.charControllerURL}/new-stories`;
  private _postNewCharacterURL = `${this.charControllerURL}/new-character`;
  private _postNewQuoteURL = `${this.charControllerURL}/new-quote`;
  private _postNewTitleURL = `${this.charControllerURL}/new-title`;

  private _putEditCharacterURL = `${this.charControllerURL}/edit-character`;

  private _deleteQuoteURL = `${this.charControllerURL}/delete-quote`;
  private _deleteTitleURL = `${this.charControllerURL}/delete-title`;
  private _deleteStoryURL = `${this.charControllerURL}/delete-story`;


  public charList$ = new BehaviorSubject<CharacterItem[] | null>(null);

  constructor(private http: HttpClient) {
    this.getCharacters().subscribe();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return of(this.charList$);
  }

  // only characters which aren't archived:
  getCharacters(): Observable<CharacterItem[]> {
    return this.http.get<CharacterItem[]>(this._getNonArchivedCharactersURL)
      .pipe(
        tap(response => {
          this.charList$.next(response);
        })
      );
  }

  // archived and non-archived characters:
  getAllCharacters(): Observable<CharacterForListItem[]> {
    return this.http.get<CharacterForListItem[]>(this._getAllCharactersURL);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this._getCharacterByIdURL}/${id}`);
  }

  getStoryTitles(): Observable<Titles[]> {
    return this.http.get<Titles[]>(this._getStoryTitlesURL);
  }

  getStoriesForCharacter(id: number): Observable<StoryForCharacter[]> {
    const params = new HttpParams().set('id', '' + id);

    return this.http.get<StoryForCharacter[]>(this._getStoriesForCharURL, { params });
  }

  getQuotesForCharacter(id: number): Observable<Quote[]> {
    const params = new HttpParams().set('id', '' + id);

    return this.http.get<Quote[]>(this._getQuotesURL, { params });
  }

  getCharacterDetails(id: number): Observable<EditCharacter> {
    const params = new HttpParams().set('id', '' + id);

    return this.http.get<EditCharacter>(this._getCharacterDetailsURL, { params });
  }

  patchCharacterState(requestBody: CharacterForChange): Observable<CharacterForChange> {
    return this.http.patch<CharacterForChange>(this._patchChangeStateURL, requestBody);
  }

  patchQuote(requestBody: EditQuote): Observable<EditQuote> {
    return this.http.patch<EditQuote>(this._patchQuoteURL, requestBody);
  }

  patchTitle(requestBody: EditTitle): Observable<EditTitle> {
    return this.http.patch<EditTitle>(this._patchTitleURL, requestBody);
  }

  patchTitlesSequence(requestBody: Titles[]): Observable<Titles[]> {
    return this.http.patch<Titles[]>(this._patchTitlesSequenceURL, requestBody);
  }

  patchStory(requestBody: StoryToSend): Observable<StoryToSend> {
    return this.http.patch<StoryToSend>(this._patchStoryURL, requestBody);
  }

  postStoryForCharacter(requestBody: StoryToSend): Observable<StoryToSend> {
    return this.http.post<StoryToSend>(this._postStoryForCharacterURL, requestBody);
  }

  postNewCharacter(formData: FormData) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        CacheControl: 'max-age=0'
      })
    };
    return this.http.post<void>(this._postNewCharacterURL, formData, httpOptions);
  }

  postNewQuote(requestBody: NewQuote): Observable<NewQuote> {
    return this.http.post<NewQuote>(this._postNewQuoteURL, requestBody);
  }

  postNewTitle(requestBody: NewTitle): Observable<NewTitle> {
    return this.http.post<NewTitle>(this._postNewTitleURL, requestBody);
  }

  putCharacterDetails(requestBody: EditCharacter): Observable<EditCharacter> {
    return this.http.put<EditCharacter>(this._putEditCharacterURL, requestBody);
  }

  deleteQuote(quoteId: number): Observable<void> {
    const params = new HttpParams().set('id', '' + quoteId);
    return this.http.delete<void>(this._deleteQuoteURL, { params });
  }

  deleteTitle(titleId: number): Observable<void> {
    const params = new HttpParams().set('id', '' + titleId);
    return this.http.delete<void>(this._deleteTitleURL, { params });
  }

  deleteStory(storyId: number): Observable<void> {
    const params = new HttpParams().set('id', '' + storyId);
    return this.http.delete<void>(this._deleteStoryURL, { params });
  }

}
