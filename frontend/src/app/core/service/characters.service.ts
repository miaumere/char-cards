import { NewTitle } from './../../modules/admin-panel/models/new-title.model';
import { EditTitle } from './../../modules/admin-panel/models/edit-title.model';
import { EditCharacter, IEditCharacter } from './../../modules/admin-panel/models/edit-character.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { CharacterItem, ICharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { Character, ICharacter } from 'src/app/modules/characters/models/character.model';
import { CharacterForChange } from 'src/app/modules/admin-panel/models/character-for-change.model';
import { Quote, IQuote } from 'src/app/modules/characters/models/quote.model';
import { NewQuote } from 'src/app/modules/admin-panel/models/new-quote.model';
import { EditQuote } from 'src/app/modules/admin-panel/models/edit-quote.model';
import { StoryToSend } from 'src/app/modules/admin-panel/models/story-to-send.model';
import { StoryToEdit } from 'src/app/modules/admin-panel/models/story-to-edit.model';
import { ICharacterForListItem } from 'src/app/modules/characters/models/character-for-list-item.model';
import { IStoryForCharacter } from 'src/app/modules/admin-panel/models/story-for-character.model';
import { ITitle, Title } from 'src/app/modules/admin-panel/models/title.model';

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
  private _postEditImagesURL = `${this.charControllerURL}/new-images`;

  private _putEditCharacterURL = `${this.charControllerURL}/edit-character`;

  private _deleteQuoteURL = `${this.charControllerURL}/delete-quote`;
  private _deleteTitleURL = `${this.charControllerURL}/delete-title`;
  private _deleteStoryURL = `${this.charControllerURL}/delete-story`;
  private _deleteImageURL = `${this.charControllerURL}/delete-image`;


  public charList$ = new BehaviorSubject<CharacterItem[] | null>(null);

  constructor(private http: HttpClient) {
    this.getCharacters().subscribe();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return of(this.charList$);
  }

  // only characters which aren't archived:
  getCharacters() {
    return this.http.get<ICharacterItem[]>(this._getNonArchivedCharactersURL)
      .pipe(
        tap(response => {
          const mappedResponse = response.map(r => new CharacterItem(r));
          this.charList$.next(mappedResponse);
        })
      );
  }

  // archived and non-archived characters:
  getAllCharacters() {
    return this.http.get<ICharacterForListItem[]>(this._getAllCharactersURL);
  }

  getCharacterById(id: number) {
    return this.http.get<ICharacter>(`${this._getCharacterByIdURL}/${id}`);
  }

  getStoryTitles() {
    return this.http.get<ITitle[]>(this._getStoryTitlesURL);
  }

  getStoriesForCharacter(id: number) {
    const params = new HttpParams().set('id', '' + id);

    return this.http.get<IStoryForCharacter[]>(this._getStoriesForCharURL, { params });
  }

  getQuotesForCharacter(id: number) {
    const params = new HttpParams().set('id', '' + id);

    return this.http.get<IQuote[]>(this._getQuotesURL, { params });
  }

  getCharacterDetails(id: number) {
    const params = new HttpParams().set('id', '' + id);

    return this.http.get<IEditCharacter>(this._getCharacterDetailsURL, { params });
  }

  patchCharacterState(requestBody: CharacterForChange) {
    return this.http.patch<CharacterForChange>(this._patchChangeStateURL, requestBody);
  }

  patchQuote(requestBody: EditQuote) {
    return this.http.patch<EditQuote>(this._patchQuoteURL, requestBody);
  }

  patchTitle(requestBody: EditTitle) {
    return this.http.patch<EditTitle>(this._patchTitleURL, requestBody);
  }

  patchTitlesSequence(requestBody: Title[]) {
    return this.http.patch<Title[]>(this._patchTitlesSequenceURL, requestBody);
  }

  patchStory(requestBody: StoryToEdit) {
    return this.http.patch<StoryToEdit>(this._patchStoryURL, requestBody);
  }

  postStoryForCharacter(requestBody: StoryToSend) {
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

  postEditImages(formData: FormData, charId: number) {
    const params = new HttpParams().set('id', '' + charId);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        CacheControl: 'max-age=0'
      }),
      params
    };
    return this.http.post<void>(this._postEditImagesURL, formData, httpOptions);
  }


  postNewQuote(requestBody: NewQuote) {
    return this.http.post<NewQuote>(this._postNewQuoteURL, requestBody);
  }

  postNewTitle(requestBody: NewTitle) {
    return this.http.post<NewTitle>(this._postNewTitleURL, requestBody);
  }

  putCharacterDetails(requestBody: EditCharacter, idDead: boolean) {
    const params = new HttpParams().set('isDead', '' + idDead);

    return this.http.put<EditCharacter>(this._putEditCharacterURL, requestBody, { params });
  }

  deleteQuote(quoteId: number) {
    const params = new HttpParams().set('id', '' + quoteId);
    return this.http.delete<void>(this._deleteQuoteURL, { params });
  }

  deleteTitle(titleId: number) {
    const params = new HttpParams().set('id', '' + titleId);
    return this.http.delete<void>(this._deleteTitleURL, { params });
  }

  deleteStory(storyId: number) {
    const params = new HttpParams().set('id', '' + storyId);
    return this.http.delete<void>(this._deleteStoryURL, { params });
  }

  deleteImage(imageId: number) {
    const params = new HttpParams().set('id', '' + imageId);
    return this.http.delete<void>(this._deleteImageURL, { params });
  }

  // custom methods:

  getCharacter(charId: number) {
    return this.getAllCharacters().pipe(
      map(charArray => charArray.filter(char => char.id === charId))
    );
  }

}
