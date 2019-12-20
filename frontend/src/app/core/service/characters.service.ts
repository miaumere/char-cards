import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CharacterItem, CharacterForListItem } from 'src/app/modules/characters/models/character-item.model';
import { Character } from 'src/app/modules/characters/models/character.model';
import { CharacterForChange } from 'src/app/modules/admin-panel/models/character-for-change.model';
import { Titles } from 'src/app/modules/admin-panel/models/titles.model';
import { StoryForCharacter } from 'src/app/modules/admin-panel/models/story.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  charControllerURL = '/api/characters';

  private _getNonArchivedCharactersURL = `${this.charControllerURL}/get-characters`;
  private _getCharacterByIdURL = `${this.charControllerURL}/get-character`;
  private _getAllCharactersURL = `${this.charControllerURL}/get-all-characters`;
  private _getStoryTitlesURL = `${this.charControllerURL}/get-titles`;

  private _patchChangeStateURL = `${this.charControllerURL}/change-state`;

  private _postStoryForCharacterURL = `${this.charControllerURL}/new-stories`;
  private _postNewCharacterURL = `${this.charControllerURL}/new-character`;


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

  patchCharactersState(requestBody: CharacterForChange): Observable<CharacterForChange> {
    return this.http.patch<CharacterForChange>(this._patchChangeStateURL, requestBody);
  }

  getStoryTitles(): Observable<Titles[]> {
    return this.http.get<Titles[]>(this._getStoryTitlesURL);
  }

  postStoryForCharacter(requestBody: StoryForCharacter): Observable<StoryForCharacter> {
    return this.http.post<StoryForCharacter>(this._postStoryForCharacterURL, requestBody);
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

}
