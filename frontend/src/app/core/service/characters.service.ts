import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CharacterForChange } from 'src/app/modules/admin-panel/models/character-for-change.model';
import { EditImageName } from 'src/app/modules/admin-panel/models/edit-image-name.model';
import { EditQuote } from 'src/app/modules/admin-panel/models/edit-quote.model';
import { EditRelationship } from 'src/app/modules/admin-panel/models/edit-relationship.model';
import { NewQuote } from 'src/app/modules/admin-panel/models/new-quote.model';
import { IRelationshipsForCharacter } from 'src/app/modules/admin-panel/models/relationships-for-char.model';
import { NewStory } from 'src/app/modules/admin-panel/models/character-story/new-story.model';
import { IStory, Story } from 'src/app/modules/admin-panel/models/story.model';
import { ICharacterForListItem } from 'src/app/modules/characters/models/character-for-list-item.model';
import { CharacterItem, ICharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { ICharacter } from 'src/app/modules/characters/models/character.model';
import { IQuote } from 'src/app/modules/characters/models/quote.model';
import { EditCharacter, IEditCharacter } from './../../modules/admin-panel/models/edit-character.model';
import { IRelationRequest } from './../../modules/admin-panel/models/relation-request.model';
import { RelationshipsForCharacter } from './../../modules/admin-panel/models/relationships-for-char.model';


@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private readonly charControllerURL = '/api/characters';

  private readonly _getNonArchivedCharactersURL = `${this.charControllerURL}/get-characters`;
  private readonly _getCharacterByIdURL = `${this.charControllerURL}/get-character`;
  private readonly _getAllCharactersURL = `${this.charControllerURL}/get-all-characters`;
  private readonly _getCharacterDetailsURL = `${this.charControllerURL}/get-details`;
  private readonly _getQuotesURL = `${this.charControllerURL}/get-quotes`;
  private readonly _getRelationshipsForCharURL = `${this.charControllerURL}/get-relationships`;
  private readonly _getStoriesForCharURL = `${this.charControllerURL}/get-stories-for-character`;

  private readonly _patchChangeStateURL = `${this.charControllerURL}/change-state`;
  private readonly _patchQuoteURL = `${this.charControllerURL}/edit-quote`;
  private readonly _patchImageNameURL = `${this.charControllerURL}/change-image-name`;
  private readonly _patchRelationshipURL = `${this.charControllerURL}/edit-relationship`;

  private readonly _postStoryForCharacterURL = `${this.charControllerURL}/new-story`;
  private readonly _postNewCharacterURL = `${this.charControllerURL}/new-character`;
  private readonly _postNewQuoteURL = `${this.charControllerURL}/new-quote`;
  private readonly _postEditImagesURL = `${this.charControllerURL}/new-images`;
  private readonly _postNewRelationshipURL = `${this.charControllerURL}/new-relationship`;

  private readonly _putEditCharacterURL = `${this.charControllerURL}/edit-character`;
  private readonly _putStoryIndexesURL = `${this.charControllerURL}/edit-story-indexes`;

  private readonly _deleteQuoteURL = `${this.charControllerURL}/delete-quote`;
  private readonly _deleteImageURL = `${this.charControllerURL}/delete-image`;
  private readonly _deleteRelationshipURL = `${this.charControllerURL}/delete-relationship`;
  private readonly _deleteStoryURL = `${this.charControllerURL}/delete-story`;


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
        map(response => {
          const mappedResponse = response.map(r => new CharacterItem(r));
          this.charList$.next(mappedResponse);
          return mappedResponse;
        })
      );
  }

  // archived and non-archived characters:
  getAllCharacters() {
    return this.http.get<ICharacterForListItem[]>(this._getAllCharactersURL).pipe(
      map(response => {
        const mappedResponse = response.map(r => new CharacterItem(r));
        this.charList$.next(mappedResponse);
        return mappedResponse;
      })
    );
  }

  getCharacterById(id: number) {
    return this.http.get<ICharacter>(`${this._getCharacterByIdURL}/${id}`);
  }

  getRelationshipsForCharacter(id: number) {
    const params = new HttpParams().set('id', '' + id);

    return this.http.get<IRelationshipsForCharacter[]>(this._getRelationshipsForCharURL, { params }).pipe(
      map(response => {
        const mappedResponse = response.map(r => new RelationshipsForCharacter(r));
        return mappedResponse;
      })
    );;
  }

  getQuotesForCharacter(id: number) {
    const params = new HttpParams().set('id', '' + id);

    return this.http.get<IQuote[]>(this._getQuotesURL, { params });
  }

  getCharacterDetails(id: number) {
    const params = new HttpParams().set('id', '' + id);

    return this.http.get<IEditCharacter>(this._getCharacterDetailsURL, { params });
  }

  getStoriesForCharacter(id: number) {
    const params = new HttpParams().set('id', '' + id);
    return this.http.get<IStory[]>(this._getStoriesForCharURL, { params })
      .pipe(
        map(response => {
          const mappedResponse = response.map(r => new Story(r));
          return mappedResponse;
        })
      );

  }

  patchCharacterState(requestBody: CharacterForChange) {
    return this.http.patch<CharacterForChange>(this._patchChangeStateURL, requestBody);
  }

  patchQuote(requestBody: EditQuote) {
    return this.http.patch<EditQuote>(this._patchQuoteURL, requestBody);
  }

  patchImageName(requestBody: EditImageName) {
    return this.http.patch<EditImageName>(this._patchImageNameURL, requestBody);
  }

  patchRelationship(requestBody: EditRelationship) {
    return this.http.patch<EditRelationship>(this._patchRelationshipURL, requestBody);
  }

  postStoryForCharacter(requestBody: NewStory) {
    return this.http.post<NewStory>(this._postStoryForCharacterURL, requestBody);
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

  postNewRelationship(requestBody: IRelationRequest) {
    return this.http.post<IRelationRequest>(this._postNewRelationshipURL, requestBody);
  }

  postNewQuote(requestBody: NewQuote) {
    return this.http.post<NewQuote>(this._postNewQuoteURL, requestBody);
  }

  putCharacterDetails(requestBody: EditCharacter, idDead: boolean) {
    const params = new HttpParams().set('isDead', '' + idDead);

    return this.http.put<EditCharacter>(this._putEditCharacterURL, requestBody, { params });
  }

  putStoriesIndexes(requestBody: number[], charId: number) {
    const params = new HttpParams().set('id', '' + charId);

    return this.http.put<number[]>(this._putStoryIndexesURL, requestBody, { params });
  }

  deleteQuote(quoteId: number) {
    const params = new HttpParams().set('id', '' + quoteId);
    return this.http.delete<void>(this._deleteQuoteURL, { params });
  }

  deleteImage(imageId: number) {
    const params = new HttpParams().set('id', '' + imageId);
    return this.http.delete<void>(this._deleteImageURL, { params });
  }

  deleteRelationship(characterId: number, relatedCharacterId: number) {
    const params = new HttpParams()
      .set('characterId', '' + characterId)
      .set('relatedCharacterId', '' + relatedCharacterId);

    return this.http.delete<void>(this._deleteRelationshipURL, { params });
  }

  deleteStory(storyId: number) {
    const params = new HttpParams().set('id', '' + storyId);
    return this.http.delete<void>(this._deleteStoryURL, { params });
  }

  // custom methods:

  getCharacter(charId: number) {
    return this.getAllCharacters().pipe(
      tap(charArray => charArray.filter(char => char.id === charId))
    );
  }

}
